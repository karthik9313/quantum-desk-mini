import { ticketRepository } from "@/lib/repositories/ticket.repo";
import { realtimeEmitter } from "@/lib/realtime/emitter"

export const ticketService = {
    async createTicket(data: any) {
        if (!data.title)
            throw new Error("Title required");
        return ticketRepository.create(data);
    },

    async getTickets(filters: any) {
        return ticketRepository.findMany(filters);
    },

    async getTicketDetail(ticketId: string) {
        return ticketRepository.findById(ticketId);
    },

    async updateStatus(ticketId: string, status: string) {
        const ticket = await ticketRepository.updateStatus(ticketId, status);

        // emit event on ticket status updates
        realtimeEmitter.ticketUpdated(ticketId, ticket)
        return ticket;
    }
};