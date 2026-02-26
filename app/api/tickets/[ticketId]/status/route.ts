import { ticketService } from "@/lib/services/ticket.service";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: { params: Promise<{ ticketId: string }> }) {
    try {
        const body = await req.json();
        const { ticketId } = await context.params

        const ticket = await ticketService.updateStatus(
            ticketId,
            body.status
        );

        return NextResponse.json(ticket);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}