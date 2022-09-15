import config from 'config'
import * as dotenv from 'dotenv'
dotenv.config()
import { createServer } from "http"
import {Server} from 'socket.io'

const httpServer = createServer()
const PORT = process.env.PORT || config.get("servicePORT")

const io = new Server(httpServer,{
    cors: {
        origin: "*",
        credentials: true
    }
})

let client
let users = []

const addClient = (id) => {
    console.log(`addClient: ${id}`)
    client = id
}

const addUser = ({userId, room}) => {
    console.log(`addUser: ${userId}, room: ${room}`)
    const existingUser = users.find((user) => user.room === room && user.userId === userId)
    if(!existingUser) users.push({userId, room})
}

io.on("connection", (socket) => {

    socket.on('joinChat', ({userId, room})=>{

        addUser({userId, room})
        socket.join(room)
    })

    socket.on('join', async(userId)=>{
        addClient(userId)
        socket.join(client)
    })

    socket.on('startChat', (owner)=>{
        io.to(owner).emit('unreadMessage')
    }),

        socket.on('sendMessage',({message, room})=>{
            const receiver = message.receiverId
            io.to(room).emit('message', {message})
            io.to(receiver).emit('unreadMessage', {message: 'Вам пришло сообщение'})
        })

    socket.on('deleteMessage', ({symbol, room})=> {
        socket.to(room).emit('deleted', {symbol})
    })

    socket.on('removeUnread', ({userId})=>{
        io.to(userId).emit('unreadMessage')
    })

    socket.on('disconnect', ()=>{
        console.log(`user had left!`)
    })
})

httpServer.listen(PORT)