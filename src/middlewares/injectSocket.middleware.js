import { getIO } from '../config/socket.js'

export const injectSocket = (req, res, next) => {
  req.io = getIO()
  next()
}
