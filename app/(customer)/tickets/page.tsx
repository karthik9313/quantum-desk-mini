"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function TicketsPage() {

    const [tickets, setTickets] = useState<any[]>([])

    useEffect(() => {
        fetch("/api/tickets")
            .then(res => res.json())
            .then(setTickets)
    }, [])

    return (

        <div>
            <h2>My Tickets</h2>

            <Link href="/tickets/new">
                Create Ticket
            </Link>

            <ul>
                {tickets.map(ticket => (
                    <li key={ticket.id}>

                        <Link href={`/tickets/${ticket.id}`}>
                            {ticket.title} ({ticket.status})
                        </Link>

                    </li>
                ))}
            </ul>
        </div>
    )
}