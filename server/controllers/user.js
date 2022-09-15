import {validationResult} from "express-validator"
import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from 'config'
import adModel from "../models/adModel.js"
import ConversationModel from "../models/ConversationModel.js"
import Message from '../models/MessageModel.js'
import UnreadModel from "../models/unreadModel.js"

class userController {
    async signUp(req, res) {
        try {
            const errorsResult = validationResult(req)
            if(!errorsResult.isEmpty()) {
                return res.status(400).json({errors: errorsResult.array()})
            }

            const {email, password, confirmPassword, firstName, lastName, date} = req.body

            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким email уже зарегистрирован на сайте'})
            }

            if (confirmPassword !== password) {
                return res.status(400).json({message: `Пароль не совпадает с паролем в поле "Подтверждение пароля"`})
            }


            const hashPassword = await bcrypt.hash(password, 12)
            await User.create({email, password: hashPassword, name: `${firstName} ${lastName}`, date})

            res.status(201).json({message: 'Новый пользователь благополучно создан'})

        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async signIn(req, res) {

        try{
            const{email, password} = req.body

            const candidate = await User.findOne({email})
            let user
            if(!candidate){
                return res.status(400).json({message: 'Пользователь с таким email не зарегистрирован'})
            }else{
                user = {
                    _id: candidate?._id,
                    email: candidate?.email,
                    name: candidate?.name,
                    date: candidate?.date,
                    phone: candidate?.phone,
                    location: candidate?.location
                }
            }

            const isPasswordCorrect = await bcrypt.compare(password, candidate?.password)
            if(!isPasswordCorrect) {
                return res.status(400).json({message: 'Неправильно введены email и(или) пароль'})
            }

            const token = jwt.sign(
                {id: candidate?._id},
                config.get('secretKey'),
                {expiresIn: '24h'}
            )

            res.json({result: user, token})

        }catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async deleteUser(req,res){

        const {password, userId} = req.body

        const candidate = await User.findOne({_id: userId})
        const isPasswordCorrect = await bcrypt.compare(password, candidate?.password)


        if(!isPasswordCorrect) {
            return res.json({message: 'Неправильный пароль'})
        }else{
            await adModel.deleteMany({creator: userId})
            await ConversationModel.deleteMany({members: {$in: [userId]}})
            await Message.deleteMany({$or: [{senderId: {$in: [userId]}}, {receiverId: {$in: [userId]}}]})
            await UnreadModel.deleteMany({user: userId})
            await User.findOneAndDelete({_id: userId})
        }

        try{
            res.json({message: 'Пользователь успешно удален'})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }


    async getAvatar(req,res){
        const {userId} = req.params

        const user = await User.findOne({_id: userId})
        const avatar = user?.avatar

        try{
            res.json(avatar)
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async changeName(req, res){
        const {newName, userId} = req.body

        await User.findOneAndUpdate({_id: userId},{$set: {name: newName}})
        const candidate = await User.findOne({_id: userId})
        let user = {
            _id: candidate?._id,
            email: candidate?.email,
            name: candidate?.name,
            date: candidate?.date,
            phone: candidate?.phone,
            location: candidate?.location
        }

        try{
            res.json({result: user, message: 'Имя успешно изменено'})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async changePassword(req,res){
        const {oldPass, newPass, userId} = req.body

        const candidate = await User.findOne({_id: userId})

        let message

        const isPasswordCorrect = await bcrypt.compare(oldPass, candidate.password)
        if(isPasswordCorrect) {
            const hashPassword = await bcrypt.hash(newPass, 12)
            await User.findOneAndUpdate({_id: userId},{$set: {password: hashPassword}})
            message = 'Пароль успешно изменен на новый'
        }else{
            message = 'Неправильно введеный старый пароль'
        }

        try{
            res.json(message)
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async changeEmail(req,res){
        const {newEmail, userId} = req.body

        await User.findOneAndUpdate({_id: userId},{$set: {email: newEmail}})
        const candidate = await User.findOne({_id: userId})
        let user = {
            _id: candidate?._id,
            email: candidate?.email,
            name: candidate?.name,
            date: candidate?.date,
            phone: candidate?.phone,
            location: candidate?.location
        }

        try {
            res.json({result: user, message: 'Email успешно изменен на новый'})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async changeAvatar(req,res){
        const {file, userId} = req.body

        await User.findOneAndUpdate({_id: userId},{$set: {avatar: file}})
        const user = await User.findOne({_id: userId})
        const avatar = user?.avatar

        try{
            res.json({result: avatar, message: 'Аватар успешно изменен на новый'})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async changePhone(req,res){
        const {newPhone, userId} = req.body

        await User.findOneAndUpdate({_id: userId}, {phone: newPhone})
        const candidate = await User.findOne({_id: userId})
        let user = {
            _id: candidate?._id,
            email: candidate?.email,
            name: candidate?.name,
            date: candidate?.date,
            phone: candidate?.phone,
            location: candidate?.location
        }

        try{
            res.json({result: user, message: 'Номер телефона успешно изменен на новый'})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async changeLocation(req,res){
        const {newLocation, userId} = req.body

        await User.findOneAndUpdate({_id: userId}, {location: newLocation})
        const candidate = await User.findOne({_id: userId})
        let user = {
            _id: candidate?._id,
            email: candidate?.email,
            name: candidate?.name,
            date: candidate?.date,
            phone: candidate?.phone,
            location: candidate?.location
        }

        try{
            res.json({result: user, message: 'Местонахождения успешно изменено на новое'})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async getInterlocutor(req,res){
        const {id} = req.params

        const candidate = await User.findOne({_id: id})
        const user = {
            name: candidate?.name,
            avatar: candidate?.avatar,
            date: candidate?.date,
            location: candidate?.location
        }

        try{
            res.json(user)
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async getFavorites(req, res) {
        const {id} = req.params
        const user = await User.findOne({_id: id})
        const favorites = user?.favorites
        const favoriteAds = await adModel.find({_id: {$in: [...favorites]}})

        try{
            res.json(favoriteAds)
        }catch(error){
            res.status(404).json({message: error.message})
        }
    }

    async removeFavorite(req,res) {
        const {id, favor} = req.body
        await User.updateOne({_id: id}, {$pull: {favorites: favor}})

        try{
            res.json({message: 'Объявление удалено из понравившихся'})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

}

export default new userController()
