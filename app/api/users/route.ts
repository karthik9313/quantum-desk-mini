import { NextRequest, NextResponse } from "next/server"
import { userService } from "@/lib/services/user.service"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const user = await userService.createUser(body)

        return NextResponse.json(user, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        const role = searchParams.get("role") as any
        const users = await userService.getUsers({ role })

        return NextResponse.json(users)
    }
    catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }
}