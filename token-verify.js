import jwt from 'jsonwebtoken'
import { config } from './config/config'

export function verifyToken (token) {
  return jwt.verify(token, config.jwtSecret)
}
