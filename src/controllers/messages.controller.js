import * as messageService from "../services/messages.service.js";
import { successResponse, errorResponse } from "../utils/helper.js";

export const createMessage = async (req, res) => {
  try {
    const { content, attachments } = req.body;
    const { channelId } = req.params;
    const senderId = req.auth.userId;

    const messageResult = await messageService.createMessage({
      content,
      attachments,
      senderId,
      channelId,
    });

    // Broadcast the message to the channel (via socket.io)
    req.io.to(channelId).emit("receive-message", messageResult);

    return successResponse(res, messageResult, "Message sent successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const updateMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content, attachments } = req.body;
    const { data, error } = await messageService.updateMessage({
      messageId,
      content,
      attachments,
      userId: req.auth.userId,
    });
    if (error) return errorResponse(res, error.message);

    return successResponse(res, data, "Message updated successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getMessagesByChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { data, error } = await messageService.getMessagesByChannel({
      channelId,
      userId: req.auth.userId,
    });
    if (error) return errorResponse(res, error.message);

    return successResponse(res, data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { data, error } = await messageService.deleteMessage({
      messageId,
      userId: req.auth.userId,
    });
    if (error) return errorResponse(res, error.message);

    return successResponse(res, data, "Message deleted successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
