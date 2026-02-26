import { Server } from "socket.io"

declare global {
    var io: Server | undefined
}

export function getIO(): Server {
    if (!global.io) {
        global.io = new Server({
            cors: {
                origin: "*"
            }
        })
    }
    return global.io
}