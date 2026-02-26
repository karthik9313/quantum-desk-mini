import { NextRequest, NextResponse } from "next/server";
import { ticketService } from "@/lib/services/ticket.service";

export async function GET(req: NextRequest, context: { params: Promise<{ ticketId: string }> }) {
    try {
        const { ticketId } = await context.params
        
        const ticket = await ticketService.getTicketDetail(ticketId);
        return NextResponse.json(ticket);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 404 }
        );
    }
}