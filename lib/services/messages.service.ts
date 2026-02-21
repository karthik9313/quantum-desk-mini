import { messagesRepository } from "@/lib/repositories/messages.repo";
import { realtimeEmitter } from "@/lib/realtime/emitter"

export const messagesService = {
    async getMessagesBasedOnTicketId(ticketId: string) {
        if (ticketId.trim().length <= 0)
            throw new Error("Ticket Id is required");
        const message = await messagesRepository.getMessagesBasedOnTicketId(ticketId)

        // emit event on message created.
        realtimeEmitter.messageCreated(ticketId, message)

        return message
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