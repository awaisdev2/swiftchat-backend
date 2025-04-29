import express from 'express';

import * as roomController from '../controllers/room.controller.js';

const router = express.Router();

router.get(
  '/',
  roomController.fetchUserRooms,
);
router.get(
  '/:roomId',
  roomController.fetchUserRoomById,
);

router.post(
  '/',
  roomController.createUserRoom,
);

export default router
