export const config = {
    port: 3004,
    jwtSecret: process.env.JWT_SECRET || 'super-secret-jwt-token-with-at-least-32-characters-long',
};
