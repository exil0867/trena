import bcrypt from 'bcrypt';
const SALT_ROUNDS = 12;
export function hashPassword(pw) {
    return bcrypt.hash(pw, SALT_ROUNDS);
}
export function verifyPassword(pw, hash) {
    return bcrypt.compare(pw, hash);
}
