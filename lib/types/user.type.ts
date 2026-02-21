import { UserRole } from "../../generated/prisma/client"

export interface CreateUserDTO {
    name: string
    role: UserRole
}

export interface UserFilters {
    role?: UserRole
}

export interface UserResponse {
    id: string
    name: string
    role: UserRole
    createdAt: Date
}