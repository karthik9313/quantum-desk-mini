import { z } from "zod"
import { UserRole } from "../../generated/prisma/client"

export const createUserSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    role: z.nativeEnum(UserRole)
})

export const userFilterSchema = z.object({
    role: z.nativeEnum(UserRole).optional()
})