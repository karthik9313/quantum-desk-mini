import { prisma } from "@/lib/db/prisma";
import { CreateUserDTO, UserFilters } from "@/lib/types/user.type"

export const userRepository = {
    async create(data: CreateUserDTO) {
        return prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                role: true,
                createdAt: true
            }
        })
    },

    async findById(userId: string) {
        return prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                role: true,
                createdAt: true
            }
        })
    },

    async findMany(filters?: UserFilters) {
        return prisma.user.findMany({
            where: {
                ...(filters?.role && {
                    role: filters.role
                })
            },
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                name: true,
                role: true,
                createdAt: true
            }
        })
    },

    async exists(userId: string) {
        const count = await prisma.user.count({where: { id: userId }})
        return count > 0
    }
}