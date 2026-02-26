import { NextRequest, NextResponse } from "next/server";
import { messagesService } from "@/lib/services/messages.service";

export async function GET(req: NextRequest, context: { params: Promise<{ ticketId: string }> }) {
    try {
        const { ticketId } = await context.params
        const messages = await messagesService.getMessagesBasedOnTicketId(ticketId);
        return NextResponse.json(messages);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}

export async function POST(req: NextRequest, context: { params: Promise<{ ticketId: string }> }) {
    try {
        const { ticketId } = await context.params
        const body = await req.json();
        
        const message = await messagesService.addMessage({
            ticketId: ticketId,
            ...body
        });

        return NextResponse.json(message, { status: 201 });

    } catch (error: any) {
        console.error("Error in sending message:", error.message)
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}