import jwt from 'jsonwebtoken'
import { config } from './config/config'

export function signToken (payload) {
  return jwt.sign(payload, config.jwtSecret)
}
