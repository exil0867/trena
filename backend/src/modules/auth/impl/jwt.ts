import { env } from "../../../lib/env.js"
import jwt from 'jsonwebtoken'

type Payload = {
  sub: string
}

export function signToken(payload: Payload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '30m'
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as Payload
}
