import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer()

export const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id)

    socket.on("join-ticket", (ticketId: string) => {
        socket.join(ticketId)
        console.log(`Socket ${socket.id} joined ticket ${ticketId}`)
    })

    socket.on("leave-ticket", (ticketId: string) => {
        socket.leave(ticketId)
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id)
    })
})

const PORT = 3001

httpServer.listen(PORT, () => {
    console.log(`Realtime server running on port ${PORT}`)
})