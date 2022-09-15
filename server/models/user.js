import pkg from 'mongoose'
const {Schema, model} = pkg

const User = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    avatar: {type: String, default: ''},
    date: {type: String, required: true},
    phone: {type: String, default: ''},
    location: {type: String, default: ''}
})

export default model('User', User)