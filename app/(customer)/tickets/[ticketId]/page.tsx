"use client"

import { useEffect, useState } from "react"
import { useTicketRealtime } from "@/lib/realtime/useTicketRealTime"

export default function TicketDetailPage({ params }: any) {

    const { ticketId } = params

    const [messages, setMessages] = useState<any[]>([])
    const [text, setText] = useState("")

    useEffect(() => {
        fetch(`/api/tickets/${ticketId}`)
            .then(res => res.json())
            .then(data => setMessages(data.messages))

    }, [ticketId])

    useTicketRealtime(ticketId, (message) => {
        setMessages(prev => [...prev, message])
    })

    async function sendMessage() {
        await fetch(`/api/tickets/${ticketId}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                authorId: "5259016b-a081-4915-9f14-0e20016732ff",
                body: text
            })
        })
        setText("")
    }

    return (
        <div>

            <h2>Ticket</h2>

            <div>
                {messages.map(msg => (

                    <div key={msg.id}>
                        {msg.body}
                    </div>

                ))}
            </div>

            <input
                value={text}
                onChange={e => setText(e.target.value)}
            />

            <button onClick={sendMessage}>
                Send
            </button>

        </div>
    )
}