import pkg from 'mongoose'
const {Schema, model} = pkg

const ConversationModel = new Schema({
    ad: {type: String, required: true},
    members: {type: [String], required: true},
    conversationId: {type: String}
},{timestampts: true}
)

export default model('Conversation', ConversationModel)