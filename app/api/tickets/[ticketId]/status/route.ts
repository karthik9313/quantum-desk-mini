import { ticketService } from "@/lib/services/ticket.service";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { ticketId: string } }) {
    try {
        const body = await req.json();

        const ticket = await ticketService.updateStatus(
            params.ticketId,
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