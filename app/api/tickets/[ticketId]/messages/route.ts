import { NextRequest, NextResponse } from "next/server";
import { messagesService } from "@/lib/services/messages.service";

export async function GET(req: NextRequest, { params }: { params: { ticketId: string } }) {
    try {
        const messages = await messagesService.getMessagesBasedOnTicketId(params.ticketId);
        return NextResponse.json(messages);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}

export async function POST(req: NextRequest, { params }: { params: { ticketId: string } }) {
    try {
        const body = await req.json();

        const message = await messagesService.addMessage({
            ticketId: params.ticketId,
            ...body
        });

        return NextResponse.json(message, { status: 201 });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}