import { env } from "../../../lib/env.js";
import jwt from 'jsonwebtoken';
export function signToken(payload) {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: '30m'
    });
}
export function verifyToken(token) {
    return jwt.verify(token, env.JWT_SECRET);
}
