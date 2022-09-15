import adModel from "../models/adModel.js"
import mongoose from "mongoose"
import ConversationModel from "../models/ConversationModel.js"
import Message from '../models/MessageModel.js'

class adController {
    async createAd(req,res){
        if(!req.userId) return res.json({message: 'Пройдите авторизацию'})

        let ad = req.body
        ad = {...ad, unix: new Date()}
        const newAd = new adModel(ad)

        try {
            await newAd.save()
            res.status(201).json(newAd)
        } catch (error) {
            res.status(409).json({message: error.message})
        }
    }

    async lastAds(req,res){
        const lastAds = await adModel.find().sort({unix: -1}).limit(8)
        const cards = []
        for(let i=0; i<lastAds?.length; i++){
            let card = {}
            card.name = lastAds[i].name
            card.image = lastAds[i].files[0]
            card.typeDeal = lastAds[i].typeDeal
            if(lastAds[i].typeDeal === 'price'){
                card.price = lastAds[i].price
                card.currency = lastAds[i].currency
                if(lastAds[i].haggle === true){
                    card.haggle = true
                }else{
                    card.haggle = false
                }
            }
            card.location = lastAds[i].location.split(',')[0]
            card.date = lastAds[i].date
            card.id = lastAds[i]._id
            cards.push(card)
        }
        try{
            res.json({data: cards})
        }catch (error){
            res.status(404).json({ message: error.message })
        }
    }

    async getAd(req,res){
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({message: 'No post with that id'})
        }

        const ad  = await adModel.findById(id)
        try{
            res.json({data: ad})
        }catch(error){
            res.status(404).json({ message: error.message })
        }
    }

    async updateAd(req,res){

        if(!req.userId) return res.json({message: 'Пройдите авторизацию'})

        const {id} = req.params
        const data = req.body

        const updatedAd = await adModel.findByIdAndUpdate(id, data, { new: true })

        try{
            res.json({data: updatedAd})
        }catch(error){
            res.status(409).json({ message: error.message })
        }
    }

    async deleteAd(req,res){

        if(!req.userId) return res.json({message: 'Пройдите авторизацию'})
        const {id} = req.params
        const conversations = await ConversationModel.find({ad: id})

        if(conversations){
            for(let i=0; i<conversations?.length; i++){
                const mes = conversations[i].conversationId
                await Message.deleteMany({conversationId: mes})
            }
        }

        await ConversationModel.deleteMany({ad: id})
        await adModel.findByIdAndDelete(id)

        try{
            res.json({message: 'Объявление успешно удалено'})
        }catch(error){
            res.status(409).json({ message: error.message })
        }
    }

    async getAdsByCategory(req, res){
        const {cat, page} = req.query

        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT

        const ads = await adModel.find({"category.value": cat}).sort({unix: -1}).limit(LIMIT).skip(startIndex)
        const total = await adModel.countDocuments({"category.value": cat})

        const cards = []

        for(let i=0; i<ads?.length; i++){
            let card = {}
            card.name = ads[i].name
            card.image = ads[i].files[0]
            card.typeDeal = ads[i].typeDeal
            if(ads[i].typeDeal === 'price'){
                card.price = ads[i].price
                card.currency = ads[i].currency
                if(ads[i].haggle === true){
                    card.haggle = true
                }else{
                    card.haggle = false
                }
            }
            card.location = ads[i].location.split(',')[0]
            card.date = ads[i].date
            card.id = ads[i]._id
            card.favorites = ads[i].favorites
            cards.push(card)
        }

        try{
            res.json({ads: cards, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
        }catch(error){
            res.status(404).json({ message: error.message })
        }
    }

    async getAdsByTags(req,res){

        const {tags, page} = req.query
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT


        const ads = await adModel.find({tags: {$in: tags.split(',')}})
            .sort({ unix: -1 }).limit(LIMIT).skip(startIndex)
        const total = await adModel.countDocuments({tags: {$in: tags.split(',')}})

        const cards = []

        for(let i=0; i<ads?.length; i++){
            let card = {}
            card.name = ads[i].name
            card.image = ads[i].files[0]
            card.typeDeal = ads[i].typeDeal
            if(ads[i].typeDeal === 'price'){
                card.price = ads[i].price
                card.currency = ads[i].currency
                if(ads[i].haggle === true){
                    card.haggle = true
                }else{
                    card.haggle = false
                }
            }
            card.location = ads[i].location.split(',')[0]
            card.date = ads[i].date
            card.id = ads[i]._id
            card.favorites = ads[i].favorites
            cards.push(card)
        }

        try{
            res.json({ads: cards, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
        }catch(error){
            res.status(404).json({ message: error.message })
        }
    }

    async getOwnAds(req,res){

        const {creator, page} = req.query
        const LIMIT = 8
        const startIndex = (Number(page) - 1) * LIMIT


        const ads = await adModel.find({creator: creator})
            .sort({ unix: -1 }).limit(LIMIT).skip(startIndex)
        const total = await adModel.countDocuments({creator: creator})

        const cards = []

        for (let i = 0; i < ads?.length; i++) {
            let card = {}
            card.name = ads[i].name
            card.image = ads[i].files[0]
            card.categoryName = ads[i].categoryName
            card.typeDeal = ads[i].typeDeal
            if (ads[i].typeDeal === 'price') {
                card.price = ads[i].price
                card.currency = ads[i].currency
                if (ads[i].haggle === true) {
                    card.haggle = true
                } else {
                    card.haggle = false
                }
            }
            card.location = ads[i].location
            card.date = ads[i].date
            card.id = ads[i]._id
            cards.push(card)
        }

        try{
            res.json({data: cards, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
        }catch(error){
            res.status(404).json({ message: error.message })
        }
    }

    async getAuthorAds(req,res){
        const {author, page} = req.query
        const LIMIT = 8
        const startIndex = (Number(page) - 1) * LIMIT

        const ads = await adModel.find({creator: author}).sort({unix: -1}).limit(LIMIT).skip(startIndex)
        const total = await adModel.countDocuments({creator: author})

        const cards = []

        for(let i=0; i<ads?.length; i++){
            let card = {}
            card.name = ads[i].name
            card.image = ads[i].files[0]
            card.typeDeal = ads[i].typeDeal
            if(ads[i].typeDeal === 'price'){
                card.price = ads[i].price
                card.currency = ads[i].currency
                if(ads[i].haggle === true){
                    card.haggle = true
                }else{
                    card.haggle = false
                }
            }
            card.location = ads[i].location.split(',')[0]
            card.date = ads[i].date
            card.id = ads[i]._id
            card.favorites = ads[i].favorites
            cards.push(card)
        }

        try{
            res.json({ads: cards, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
        }catch(error){
            res.status(404).json({ message: error.message })
        }
    }

    async getAdForConversation (req,res){
        const {id} = req.params

        const ad = await adModel.find({_id: id})
        const convAd = {
            photo: ad?.files[0],
            name: ad?.name
        }
        try{
            res.json(convAd)
        }catch(error){
            res.status(404).json({message: error.message})
        }
    }

    async addFavorite(req, res){
        const {id, favor} = req.body

        await adModel.updateOne({_id: id}, {$push: {favorites: favor}})

        try{
            res.json({message: 'Объявление добавлено в понравившиеся'})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async removeFavorite(req, res){
        const {id, favor} = req.body
        await adModel.updateOne({_id: id}, {$pull: {favorites: favor}})

        try{
            res.json({message: 'Объявление удалено из понравившихся'})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async getFavorites(req, res){
        const {id, page} = req.query

        const LIMIT = 8
        const startIndex = (Number(page) - 1) * LIMIT

        const ads = await adModel.find({favorites: {$in: [id]}})
            .sort({unix: -1}).limit(LIMIT).skip(startIndex)
        const total = await adModel.countDocuments({favorites: {$in: [id]}})

        const cards = []

        for(let i=0; i<ads?.length; i++){
            let card = {}
            card.name = ads[i].name
            card.image = ads[i].files[0]
            card.typeDeal = ads[i].typeDeal
            if(ads[i].typeDeal === 'price'){
                card.price = ads[i].price
                card.currency = ads[i].currency
                if(ads[i].haggle === true){
                    card.haggle = true
                }else{
                    card.haggle = false
                }
            }
            card.location = ads[i].location.split(',')[0]
            card.date = ads[i].date
            card.id = ads[i]._id
            card.favorites = ads[i].favorites
            cards.push(card)
        }

        try{
            res.json({ads: cards, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
        }catch(error){
            res.status(404).json({message: error.message})
        }
    }
}

export default new adController()