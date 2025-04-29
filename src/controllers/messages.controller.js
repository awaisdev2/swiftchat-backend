import supabase from "../config/supabase.js";
import * as messageService from "../services/messages.service.js";
import { successResponse, errorResponse } from "../utils/helper.js";

export const createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const { channelId } = req.params;
    const senderId = req.auth.userId;

    const { data, error } = await messageService.createMessage({
      content,
      senderId,
      channelId,
    });
    if (error) return errorResponse(res, error.message);

    // Broadcast the message to the channel (via socket.io)
    req.io.to(channelId).emit("receive-message", data);

    return successResponse(res, data, "Message sent successfully");
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
