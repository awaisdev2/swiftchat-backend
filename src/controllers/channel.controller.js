import * as channelService from "../services/channel.service.js";
import { successResponse, errorResponse } from "../utils/helper.js";

export const createChannel = async (req, res) => {
  try {
    const { name, memberIds = [] } = req.body;
    const userId = req.auth.userId;

    const { data, error } = await channelService.createChannel({
      name,
      createdBy: userId,
      memberIds,
    });

    if (error) return errorResponse(res, error.message);

    return successResponse(res, data, "Channel created successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getChannels = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { data, error } = await channelService.getChannels({ userId });
    if (error) return errorResponse(res, error.message);

    return successResponse(res, data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getChannelById = async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const { data, error } = await channelService.getChannelById({ channelId });
    if (error) return errorResponse(res, error.message);

    return successResponse(res, data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const updateChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { data, error } = await channelService.updateChannel({ channelId, payload: req.body });
    if (error) return errorResponse(res, error.message);

    return successResponse(res, data, "Channel updated");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const deleteChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { data, error } = await channelService.deleteChannel({ channelId });
    if (error) return errorResponse(res, error.message);

    return successResponse(res, data, "Channel deleted");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const sendChannelInvitations = async (req, res) => {
  try {
    const { channelId, memberIds } = req.body;
    const invitedBy = req.auth.userId;

    const { data, error } = await invitationService.createInvitations({
      channelId,
      invitedBy,
      memberIds,
    });

    if (error) return errorResponse(res, error.message);
    return successResponse(res, data, "Invitations sent successfully");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const respondToInvitation = async (req, res) => {
  try {
    const { invitationId, status } = req.body;
    const userId = req.auth.userId;

    const { data, error } = await invitationService.respondToInvitation({
      invitationId,
      userId,
      status,
    });

    if (error) return errorResponse(res, error.message);

    // if accepted, add to channel_members
    if (status === "accepted") {
      await supabase.from("channel_members").insert({
        channel_id: data.channel_id,
        user_id: userId,
      });
    }

    return successResponse(res, data, `Invitation ${status}`);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

export const getMyPendingInvitations = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { data, error } = await invitationService.getPendingInvitations({
      userId,
    });

    if (error) return errorResponse(res, error.message);
    return successResponse(res, data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};
