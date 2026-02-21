import { messagesRepository } from "@/lib/repositories/messages.repo";

export const messagesService = {
    async getMessagesBasedOnTicketId(ticketId: string) {
        if (ticketId.trim().length <= 0)
            throw new Error("Ticket Id is required");
        return messagesRepository.getMessagesBasedOnTicketId(ticketId)
    },

    async addMessage(data: any) {
        if (!data.title)
            throw new Error("Title required");
        return messagesRepository.addMessage(data);
    },

    async editMessage(messageId: string, data: any) {
        return messagesRepository.editMessage(messageId, data);
    }
};