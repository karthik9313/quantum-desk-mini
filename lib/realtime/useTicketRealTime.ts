"use client"

import { useEffect } from "react"
import { socket } from "./socket"

export function useTicketRealtime(ticketId: string, onMessage: (message: any) => void) {

    useEffect(() => {
        if (!ticketId) return

        socket.emit("join-ticket", ticketId)
        socket.on("message:created", onMessage)

        return () => {
            socket.emit("leave-ticket", ticketId)
            socket.off("message:created", onMessage)
        }

    }, [ticketId])
}