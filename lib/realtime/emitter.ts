export const realtimeEmitter = {

    async messageCreated(ticketId: string, message: any) {

        console.log("Sending to realtime server:", message.id)

        await fetch("http://localhost:3001/emit", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                ticketId,
                message
            })

        })

    }

}