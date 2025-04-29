import express from 'express'
import * as messageController from '../controllers/messages.controller.js'
import { requireAuth } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/:channelId', requireAuth, messageController.getMessagesByChannel)
router.post('/:channelId', requireAuth, messageController.createMessage)
router.delete('/:messageId', requireAuth, messageController.deleteMessage)

export default router
