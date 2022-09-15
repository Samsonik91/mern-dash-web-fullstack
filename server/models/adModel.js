import pkg from 'mongoose'
const {Schema, model} = pkg

const Ad = new Schema({
    name: {type: String, required: true},
    tags: {type: [String], required: true},
    category: {type: Object, required: true},
    avatar: {type: String},
    files: [String],
    description: {type: String, required: true},
    typeDeal: {type: String, required: true},
    price: String,
    currency: String,
    haggle: Boolean,
    isBusiness: {type: Boolean, required: true},
    isNewItem: {type: Boolean, required: true},
    delivery: {type: Boolean},
    postServices: [String],
    location: {type: String, required: true},
    contactFace: {type: String, required: true},
    email: String,
    phone: String,
    unix: {type: Number, required: true},
    date: {type: String, required: true},
    sinceFromUser: {type: String, required: true},
    creator: {type: String, required: true},
    creatorName: {type: String, required: true},
    favorites: [String]
})

export default model('Ad', Ad)