import { successResponse, errorResponse } from "../utils/helper.js";
import * as roomService from "../services/rooms.service.js";

export const createUserRoom = async (req, res) => {
  try {
    const { name, isPublic } = req.body;
    const owner_id = req.auth.userId;

    const { data } = await roomService.createRoom({ name, isPublic, owner_id });

    return successResponse(res, data, "Room created successfully", 201);
  } catch (error) {
    return errorResponse(res, error.message, "Failed to create room");
  }
};

export const fetchUserRooms = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const { data } = await roomService.getUserRooms(userId);

    return successResponse(res, data, "Rooms fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, "Failed to fetch rooms");
  }
};

export const fetchUserRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.auth.userId;

    const { data, error } = await roomService.getUserRoomById(roomId);

    if (error) {
      throw new Error("Failed to fetch room");
    }

    if (!data) {
      throw new Error("Room not found");
    }

    // Check if user has access to the room
    if (!data.is_public && data.owner_id !== userId) {
      throw new Error("Unauthorized access to room");
    }

    return successResponse(res, data, "Room fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, "Failed to fetch room");
  }
};
