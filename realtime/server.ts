import { createServer } from "http"
import { getIO } from "./socket"

const io = getIO()

const httpServer = createServer(async (req, res) => {

    if (req.method === "POST" && req.url === "/emit") {

        let body = ""

        req.on("data", chunk => {
            body += chunk
        })

        req.on("end", () => {

            const { ticketId, message } = JSON.parse(body)

            console.log("Realtime server emitting:", message.id)

            io.to(ticketId).emit("message:created", message)

            res.writeHead(200)
            res.end("OK")

        })

        return
    }

    res.writeHead(404)
    res.end()

})

io.attach(httpServer)

io.on("connection", socket => {

    console.log("Client connected:", socket.id)

    socket.on("join-ticket", ticketId => {

        console.log("Joining:", ticketId)

        socket.join(ticketId)

    })

})

httpServer.listen(3001, () => {
    console.log("Realtime server running on port 3001")
})