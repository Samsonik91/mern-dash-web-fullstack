import MessageModel from "../models/MessageModel.js"
import messageModel from "../models/MessageModel.js"
import Unread from "../models/unreadModel.js"

class MessageController {
    async addMessage (req,res) {

        let newMessage = req.body

        const unread = await Unread.findOne({id: newMessage?.conversationId, user: newMessage?.receiverId})
        if(unread){
            const newUnread = {id: newMessage?.conversationId, user: newMessage?.receiverId, count: unread?.count +1}
            await Unread.findOneAndUpdate({id: newMessage?.conversationId}, newUnread, {new: true})
        }else{
            const newUnread = {id: newMessage?.conversationId, user: newMessage?.receiverId, count: 1}
            const unreadToSave = new Unread(newUnread)
            await unreadToSave.save()
        }

        newMessage = {...newMessage, createdAt: Date.now()}
        newMessage = new messageModel(newMessage)

        try{
            const savedMessage = await newMessage.save()
            res.status(201).json(savedMessage)
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async getMessages (req,res) {
        const {conversationId} = req.params
        try{
            const messages = await MessageModel.find({conversationId: conversationId})
            res.json(messages)
        }catch(error){
            res.status(404).json({message: error.message})
        }
    }

    async deleteMessage (req,res) {
        const {symbol} = req.params

        await MessageModel.findOneAndDelete({symbol: symbol})
        try{
            res.json({message: 'Сообщение успешно удалено!'})
        }catch(error){
            res.status(404).json({message: error.message})
        }
    }

    async deleteMessages (req,res) {
        const {id} = req.params

        await MessageModel.deleteMany({conversationId: id})
        try{
            res.json({message: 'Сообщения успешно удалены'})
        }catch(error){
            res.status(404).json({message: error.message})
        }
    }
}

export default new MessageController()