import { prisma } from "@/lib/db/prisma";

export const messagesRepository = {
    async getMessagesBasedOnTicketId(ticketId: string) {
        return prisma.message.findMany({ where: { id: ticketId } });
    },

    async addMessage(data: any) {
        return prisma.message.create({
            data
        });
    },

    async editMessage(messageId: string, data: any) {
        return prisma.ticket.update({
            where: { id: messageId },
            data: data
        });
    }
};