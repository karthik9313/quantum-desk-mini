import { prisma } from "../lib/db/prisma"

async function main() {

    const agent = await prisma.user.create({
        data: {
            name: "Agent Smith",
            role: "AGENT"
        }
    })

    const customer = await prisma.user.create({
        data: {
            name: "John Customer",
            role: "CUSTOMER"
        }
    })

    const ticket = await prisma.ticket.create({
        data: {
            title: "My app is broken",
            createdById: customer.id,
            assignedToId: agent.id
        }
    })

    await prisma.message.create({
        data: {
            ticketId: ticket.id,
            authorId: customer.id,
            body: "Please help"
        }
    })

}

main()
    .then(() => {
        console.log("Seed complete")
    })
    .catch(console.error)
    .finally(() => prisma.$disconnect())