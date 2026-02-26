"use client"

import { useEffect, useState } from "react"
import { useTicketRealtime } from "@/lib/realtime/useTicketRealTime"
import { useParams } from "next/navigation"

export default function TicketDetailPage({ params }: any) {

    //const { ticketId } = params
    const { ticketId } = useParams<{ ticketId: string }>()

    const [messages, setMessages] = useState<any[]>([])
    const [title, setTitle] = useState<string>("")
    const [text, setText] = useState("")

    useEffect(() => {
        fetch(`/api/tickets/${ticketId}`)
            .then(res => res.json())
            .then(data => { setMessages(data.messages); setTitle(data.title) })

    }, [ticketId])

    useTicketRealtime(ticketId, (message) => {
        console.log("Page Message:", message)
        setMessages(prev => {
            if (prev.some(m => m.id === message.id))
                return prev
            return [...prev, message]
        })
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

            <h2>Ticket - {ticketId} - {title} - Messages</h2>

            <div>
                {messages.map(msg => (

                    <div key={msg.id}>
                        {msg.body}
                    </div>

                ))}
            </div>

            <input style={{ border: "1px solid red" }}
                value={text}
                onChange={e => setText(e.target.value)}
            />

            <button onClick={sendMessage}>
                Send
            </button>

        </div>
    )
}