import {Router} from "express"
import Conversation from '../controllers/conversationController.js'

const router = new Router

router.post('/', Conversation.addConversation)
router.delete('/:id', Conversation.deleteConversation)
router.get('/getConversation/:userId', Conversation.getConversation)
router.get('/unread/:userId', Conversation.getUnread)
router.get('/remove', Conversation.removeUnread)

export default router