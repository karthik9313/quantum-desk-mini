import { prisma } from "@/lib/db/prisma";

export const ticketRepository = {
    async create(data: any) {
        return prisma.ticket.create({
            data
        });
    },

    async findMany(filters: any) {
        return prisma.ticket.findMany({
            orderBy: { updatedAt: "desc" }
        });
    },

    async findById(ticketId: string) {
        return prisma.ticket.findUnique({
            where: { id: ticketId },
            include: {
                messages: true
            }
        });
    },

    async updateStatus(ticketId: string, status: any) {

        return prisma.ticket.update({
            where: { id: ticketId },
            data: { status }
        });
    }
};