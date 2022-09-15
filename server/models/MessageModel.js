import pkg from 'mongoose'
const {Schema, model} = pkg

const Message = new Schema({
    symbol: {type: String, required: true},
    conversationId: {type: String, required: true},
    senderId: {type: String, required: true},
    receiverId: {type: String, required: true},
    text: {type: String, required: true},
    createdAt: {type: Number, required: true}
    })

export default model('Message', Message)