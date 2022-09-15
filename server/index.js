import express from 'express'
import config from 'config'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
dotenv.config()
import userRoutes from './routes/user.js'
import adRoutes from './routes/adRouter.js'
import conversationRouter from './routes/converstionsRouter.js'
import messageRouter from './routes/messangesRouter.js'

const app = express()
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())
app.use(express.json())
app.use('/user', userRoutes)
app.use('/ad', adRoutes)
app.use('/conversation', conversationRouter)
app.use('/messages', messageRouter)

const PORT = process.env.PORT || config.get('servicePORT')

mongoose.connect(config.get('dbURL'), {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log(`Server works on PORT: ${PORT}`)))
    .catch((error)=> console.log(error.message))

