import { ticketRepository } from "@/lib/repositories/ticket.repo";

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
        return ticketRepository.updateStatus(ticketId, status);
    }
};