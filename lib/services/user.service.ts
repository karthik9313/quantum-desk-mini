import { userRepository } from "@/lib/repositories/user.repo"
import { createUserSchema, userFilterSchema } from "@/lib/validations/user.validation"
import { CreateUserDTO, UserFilters } from "@/lib/types/user.type"

export const userService = {

    async createUser(data: CreateUserDTO) {
        const validated = createUserSchema.parse(data);

        return userRepository.create(validated);
    },

    async getUserById(userId: string) {
        if (!userId)
            throw new Error("User ID required")

        const user = await userRepository.findById(userId)

        if (!user)
            throw new Error("User not found")

        return user
    },

    async getUsers(filters?: UserFilters) {
        const validated = userFilterSchema.parse(filters || {})

        return userRepository.findMany(validated)
    }
}