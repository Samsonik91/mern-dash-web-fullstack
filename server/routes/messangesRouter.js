import {Router} from "express"
import MessageController from "../controllers/messageController.js"

const router = new Router

router.post('/', MessageController.addMessage)
router.get('/:conversationId', MessageController.getMessages)
router.delete('/deleteMessage/:symbol', MessageController.deleteMessage)
router.delete('/deleteAll/:id', MessageController.deleteMessages)

export default router