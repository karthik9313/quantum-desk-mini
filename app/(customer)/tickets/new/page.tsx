"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateTicketPage() {

    const [title, setTitle] = useState("")
    const router = useRouter()

    async function handleSubmit(e: any) {
        e.preventDefault()

        const res = await fetch("/api/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                createdById: "5259016b-a081-4915-9f14-0e20016732ff"
            })
        })

        const ticket = await res.json()

        router.push(`/tickets/${ticket.id}`)
    }

    return (
        <form onSubmit={handleSubmit}>

            <h2>Create Ticket</h2>

            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ticket title"
            />

            <button type="submit">
                Create
            </button>
        </form>
    )
}