import pkg from 'mongoose'
const {Schema, model} = pkg

const unreadModel = new Schema({
        id: {type: String},
        user: {type: String},
        count: {type: Number}
    },{timestampts: true}
)

export default model('Unread', unreadModel)