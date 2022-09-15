import conversationModel from "../models/ConversationModel.js"
import adModel from "../models/adModel.js"
import User from '../models/user.js'
import Unread from '../models/unreadModel.js'
import Message from '../models/MessageModel.js'
import randomstring from 'randomstring'

class ConversationController {
    async addConversation (req, res) {

        const conversation = req.body

        const candidate = await conversationModel.findOne(
            {ad: conversation.ad, members: {$in: [conversation.senderId]}})

        if(candidate) {
            return res.json(candidate?.conversationId)
        }

        const conversationId = await randomstring.generate(12)

        const newConversation = new conversationModel({
            ad: conversation.ad,
            members: [conversation.senderId, conversation.receiverId],
            conversationId
        })
        await newConversation.save()

        try{
            res.json(conversationId)
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async getConversation (req,res) {
        const userId = req.params.userId
        try{
            const conver = await conversationModel.find({members: {$in: [userId]}})
            const conversations = []
            for(let i=0; i<conver?.length; i++){
                let conversation = {}
                conversation.members = conver[i].members
                conversation.ad = conver[i].ad
                conversation.id = conver[i].conversationId

                const item = await adModel.findOne({_id: conversation.ad})
                conversation.name = item?.name
                conversation.photo = item?.files[0]

                const interlocutorId = await conversation.members.find(m=> m !== userId)
                const candidate = await User.findOne({_id: interlocutorId})
                conversation.interlocutor = candidate?.name

                conversations.push(conversation)
            }
            res.json(conversations)
        }catch(error){
            res.status(404).json({message: error.message})
        }
    }

    async deleteConversation(req,res){
        const {id} = req.params
        await Message.deleteMany({conversationId: {$in: [id]}})
        await conversationModel.findOneAndDelete({conversationId: id})

        try{
            res.json({result: 'OK'})
        }catch(error){
            res.status(404).json({message: error.message})
        }
    }

    async getUnread(req,res){
        const {userId} = req.params

        const unread = await Unread.find({user: userId})

        let total = 0

        if(unread?.length > 0){
            for(let i=0; i<unread?.length; i++){
                total = total + unread[i].count
            }
        }

        try{
            res.json({unread, total})
        }catch(error){
            res.status(404).json({message: error.message})
        }
    }

    async removeUnread(req,res){
        const conversationId = req.query.conversationId
        const userId = req.query.userId

        await Unread.findOneAndDelete({id: conversationId, user: userId})

        const unread = await Unread.find({user: userId})
        let total = 0

        if(unread?.length > 0){
            for(let i=0; i<unread?.length; i++){
                total = total + unread[i].count
            }
        }

        try{
            res.json({unread, total})
        }catch(error){
            res.status(404).json({message: error.message})
        }
    }
}

export default new ConversationController()