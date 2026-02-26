import { NextRequest, NextResponse } from "next/server"
import { userService } from "@/lib/services/user.service"

export async function GET(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await context.params
        const user = await userService.getUserById(userId)

        return NextResponse.json(user)
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 404 }
        )
    }
}