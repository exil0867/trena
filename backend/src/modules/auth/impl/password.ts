import bcrypt from 'bcrypt'

const SALT_ROUNDS = 12;

export function hashPassword(pw: string) {
  return bcrypt.hash(pw, SALT_ROUNDS)
}

export function verifyPassword(pw: string, hash: string) {
  return bcrypt.compare(pw, hash)
}
