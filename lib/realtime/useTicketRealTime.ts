"use client"

import { useEffect, useRef } from "react"
import { socket } from "./socket"

export function useTicketRealtime(ticketId: string, onMessage: (message: any) => void) {
    console.log("Inside useTicketRealtime", ticketId, onMessage)
    // Store latest callback safely
    const onMessageRef = useRef(onMessage)

    socket.onAny((event, ...args) => {
        console.log("Received event:", event, args)
    })

    // Always update ref when callback changes
    useEffect(() => {
        onMessageRef.current = onMessage
    }, [onMessage])


    // Main socket effect
    useEffect(() => {
        if (!ticketId) return

        console.log("Joining ticket:", ticketId)

        socket.emit("join-ticket", ticketId)

        const handler = (message: any) => {
            console.log("Realtime received:", message)
            onMessageRef.current(message)
        }

        socket.on("message:created", handler)

        return () => {
            console.log("Leaving ticket:", ticketId)
            socket.emit("leave-ticket", ticketId)
            socket.off("message:created", handler)
        }
    }, [ticketId])
}