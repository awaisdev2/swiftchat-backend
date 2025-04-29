import express from 'express'
import * as channelController from '../controllers/channel.controller.js'
import { requireAuth } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', requireAuth, channelController.getChannels)
router.get('/:channelId', requireAuth, channelController.getChannelById)

router.post('/', requireAuth, channelController.createChannel)

router.delete('/:channelId', requireAuth, channelController.deleteChannel)

router.get("/:channelId/invitations", channelController.getMyPendingInvitations);
router.post("/invitations", channelController.sendChannelInvitations);
router.post("/:channelId/invitations/respond", channelController.respondToInvitation)


export default router
