import { getXataClient } from "@/xata";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params } : {
    params: {id: string}
}) {

    const client = getXataClient();
    try {
        await client.db.experience.delete(params.id)

        return NextResponse.json({"success": true})
    } catch (error) {
        return NextResponse.json(
            {"message": (error as Error).message}, {
                status: 500,
            }
        )
    }
    
}