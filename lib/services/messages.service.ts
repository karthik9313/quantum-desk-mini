import { messagesRepository } from "@/lib/repositories/messages.repo";
import { realtimeEmitter } from "@/lib/realtime/emitter"

export const messagesService = {
    async getMessagesBasedOnTicketId(ticketId: string) {
        if (ticketId.trim().length <= 0)
            throw new Error("Ticket Id is required");
        const message = await messagesRepository.getMessagesBasedOnTicketId(ticketId)



        return message
    },

    async addMessage(data: any) {
        const message = await messagesRepository.addMessage(data);

        // emit event on message created.
        realtimeEmitter.messageCreated(data.ticketId, message)
        return message;
    },

    async editMessage(messageId: string, data: any) {
        return messagesRepository.editMessage(messageId, data);
    }
};