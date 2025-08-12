import express from "express";
import * as messageController from "../controllers/messages.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createMessageValidator, updateMessageValidator } from "../validators/messages.validator.js";
import { validate } from "express-validation";

const router = express.Router();

router.get("/:channelId", requireAuth, messageController.getMessagesByChannel);
router.post(
  "/:channelId",
  requireAuth,
  validate(createMessageValidator),
  messageController.createMessage
);
router.put(
  "/:channelId/message/:messageId",
  requireAuth,
  validate(updateMessageValidator),
  messageController.updateMessage
);
router.delete(
  "/:channelId/message/:messageId",
  requireAuth,
  messageController.deleteMessage
);

export default router;
