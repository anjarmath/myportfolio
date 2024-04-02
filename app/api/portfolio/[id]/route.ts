import { removeBase64Prefix } from '@/app/__utils/base64convert';
import { getXataClient } from '@/xata'
import { XataFile } from '@xata.io/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(req: NextRequest, { params } : {
    params: {id: string}
}) {
    const client = getXataClient();
    const data = await client.db.portfolio.read(params.id);
    if (!data) {
        return NextResponse.json({"message" : "not found"}, {
            status: 404,
        })
       
    }

   return NextResponse.json(data)
}

export async function DELETE(req: NextRequest, { params } : {
    params: {id: string}
}) {

    const client = getXataClient();
    try {
        await client.db.portfolio.delete(params.id)

        return NextResponse.json({"success": true})
    } catch (error) {
        return NextResponse.json(
            {"message": (error as Error).message}, {
                status: 500,
            }
        )
    }
    
}

const reqValidate = z.object({
    title : z.string(),
    description: z.string(),
    url: z.string().optional(),
    github_url: z.string().optional(),
    image: z.string(),
    is_show: z.boolean().default(true),
    tag: z.array(z.string())
})
export async function PATCH(req: NextRequest, { params } : {
    params: {id: string}
}) {
    const jsonReq = await req.json()
    const validatedReq = reqValidate.safeParse(jsonReq)
    if (!validatedReq.success) {
        return NextResponse.json(
            {"message": validatedReq.error.message}, {
                status: 500,
            }
        )
    }

    const imageBase64 = removeBase64Prefix(validatedReq.data.image)

    try {
        const client = getXataClient();
        await client.db.portfolio.update(params.id, {
            title: validatedReq.data.title,
            description: validatedReq.data.description,
            url: validatedReq.data.url,
            github_url: validatedReq.data.github_url,
            image: XataFile.fromBase64(imageBase64, {
                mediaType: "image/jpg",
                enablePublicUrl: true
            }),
            is_show: validatedReq.data.is_show,
            tag: validatedReq.data.tag,
        });
    
        return NextResponse.json({"success": true})
    } catch (error ) {
        return NextResponse.json(
            {"message": (error as Error).message}, {
                status: 500,
            }
        )
    }
}