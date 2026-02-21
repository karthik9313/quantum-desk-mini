import { NextRequest, NextResponse } from "next/server";
import { ticketService } from "@/lib/services/ticket.service";

export async function GET(req: NextRequest, { params }: { params: { ticketId: string } }) {
    try {
        const ticket = await ticketService.getTicketDetail(params.ticketId);
        return NextResponse.json(ticket);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 404 }
        );
    }
}