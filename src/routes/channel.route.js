import express from "express";
import * as channelController from "../controllers/channel.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createChannelValidator } from "../validators/channel.validator.js";
import { validate } from "express-validation";

const router = express.Router();

router.get("/", requireAuth, channelController.getChannels);
router.get("/:channelId", requireAuth, channelController.getChannelById);

router.post("/", requireAuth, validate(createChannelValidator), channelController.createChannel);
router.put("/:channelId", requireAuth, validate(createChannelValidator), channelController.updateChannel);

router.delete("/:channelId", requireAuth, channelController.deleteChannel);

router.get(
  "/:channelId/invitations",
  channelController.getMyPendingInvitations
);
router.post("/invitations", channelController.sendChannelInvitations);
router.post(
  "/:channelId/invitations/respond",
  channelController.respondToInvitation
);

export default router;
