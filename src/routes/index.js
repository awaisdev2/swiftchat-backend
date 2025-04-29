import express from 'express';
import roomRoutes from './room.route.js'
import channelRoutes from './channel.route.js'
import messagesRoutes from './messages.route.js'

import { requireAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/rooms',
    route: roomRoutes,
    middlewares: [requireAuth],
  },
  {
    path: '/channels',
    route: channelRoutes,
    middlewares: [requireAuth],
  },
  {
    path: '/messages',
    route: messagesRoutes,
    middlewares: [requireAuth],
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, ...route.middlewares, route.route);
});

export default router;
