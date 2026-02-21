import { NextRequest, NextResponse } from "next/server"
import { userService } from "@/lib/services/user.service"

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const user = await userService.getUserById(params.userId)

        return NextResponse.json(user)
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 404 }
        )
    }
}