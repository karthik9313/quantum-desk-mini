import { io } from "@/realtime/server"
import { EVENTS } from "@/realtime/events"

export const realtimeEmitter = {

    messageCreated(ticketId: string, message: any) {
        io.to(ticketId).emit(EVENTS.MESSAGE_CREATED, message)
    },

    ticketUpdated(ticketId: string, ticket: any) {
        io.to(ticketId).emit(EVENTS.TICKET_UPDATED, ticket)
    }
}