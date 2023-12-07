import { getXataClient } from "@/xata";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
    const client = getXataClient();
    const data = await client.db.experience.getAll();
    if (!data) {
        return NextResponse.json({"message" : "not found"}, {
            status: 404,
        })
       
    }

   return NextResponse.json(data)
}

const reqValidate = z.object({
    title : z.string(),
    company: z.string(),
    period: z.string(),
    index: z.number().default(0),
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

    const client = getXataClient();
    try {
        await client.db.experience.create({
            title: validatedReq.data.title,
            company: validatedReq.data.company,
            period: validatedReq.data.period,
            index: validatedReq.data.index,
        })

        return NextResponse.json({"success": true})
    } catch (error) {
        return NextResponse.json(
            {"message": (error as Error).message}, {
                status: 500,
            }
        )
    }
    
}