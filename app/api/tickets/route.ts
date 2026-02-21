import { NextRequest, NextResponse } from "next/server";
import { ticketService } from "@/lib/services/ticket.service";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const userId = searchParams.get("userId");
        const role = searchParams.get("role");

        const tickets = await ticketService.getTickets({
            userId,
            role
        });

        return NextResponse.json(tickets);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // To do: add json body validations before calling services

        const ticket = await ticketService.createTicket(body);
        return NextResponse.json(ticket, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}

