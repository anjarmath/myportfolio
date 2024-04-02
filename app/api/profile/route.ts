import { removeBase64Prefix } from '@/app/__utils/base64convert';
import { getXataClient } from '@/xata'
import { XataFile } from '@xata.io/client';
import { NextRequest, NextResponse } from 'next/server';
import z from "zod"

export async function GET(req: NextRequest) {
    const client = getXataClient();
    const data = await client.db.my_profile.read("rec_clbronl1j6d65ssbjt60");
    if (!data) {
        return NextResponse.json({"message" : "not found"}, {
            status: 404,
        })
       
    }

   return NextResponse.json(data)
}

const reqValidate = z.object({
    greeting: z.string() || null,
    desc_title: z.string() || null,
    desc_content: z.string() || null,
    email: z.string().email() || null,
    mood: z.string().max(5) || null,
    resume: z.string() || null,
    image: z.string() || null,
})

export async function POST(req: NextRequest) {
    const jsonReq = await req.json()
    const validatedReq = reqValidate.safeParse(jsonReq)
    if (!validatedReq.success) {
        return NextResponse.json(
            {"message": validatedReq.error.message}, {
                status: 500,
            }
        )
    }

    const resumeBase64 = removeBase64Prefix(validatedReq.data.resume)
    const imageBase64 = removeBase64Prefix(validatedReq.data.image)

    try {
        const client = getXataClient();
        await client.db.my_profile.update("rec_clbronl1j6d65ssbjt60", {
            greeting: validatedReq.data.greeting,
            desc_title: validatedReq.data.desc_title,
            desc_content: validatedReq.data.desc_content,
            email: validatedReq.data.email,
            mood: validatedReq.data.mood,
            resume: XataFile.fromBase64(resumeBase64, {
                mediaType: "application/pdf",
                enablePublicUrl: true
            }),
            image: XataFile.fromBase64(imageBase64, {
                mediaType: "image/jpg",
                enablePublicUrl: true
            }),
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