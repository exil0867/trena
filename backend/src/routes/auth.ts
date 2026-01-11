// backend/src/routes/auth.ts
import { Context } from 'hono';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { query } from '../lib/database/index.js';
import bcrypt from "bcryptjs";


function generateTokens(user: { id: any; email: any; role: any; }) {
  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: config.accessTokenExpiry }
  );

  const refreshToken = jwt.sign(
    { sub: user.id },
    config.jwtSecret,
    { expiresIn: config.refreshTokenExpiry }
  );

  return { accessToken, refreshToken };
}

export async function signUp(c: Context) {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: "Invalid request" }, 400);
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = await query(
      "INSERT INTO accounts (email, password_hash) VALUES ($1, $2) RETURNING id, email, role",
      [email, hashed]
    );

    const user = result.rows[0];
    const tokens = generateTokens(user);

    return c.json({ user, ...tokens });
  } catch (err) {
    return c.json({ error: "Signup failed", details: String(err) }, 500);
  }
}

export async function signIn(c: Context) {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: "Invalid request" }, 400);
  }

  try {
    const result = await query(
      "SELECT * FROM accounts WHERE email = $1",
      [email]
    );

    if (result.rowCount === 0) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const tokens = generateTokens(user);
    return c.json({ user: { id: user.id, email: user.email, role: user.role }, ...tokens });
  } catch (err) {
    return c.json({ error: "Login failed", details: String(err) }, 500);
  }
}


export async function refreshToken(c: Context) {
  const { refresh_token } = await c.req.json();

  if (!refresh_token) {
    return c.json({ error: "Invalid request" }, 400);
  }

  try {
    const decoded = jwt.verify(refresh_token, config.jwtSecret) as jwt.JwtPayload;

    const result = await query("SELECT id, email, role FROM accounts WHERE id = $1", [decoded.sub]);

    if (result.rowCount === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    const user = result.rows[0];
    const tokens = generateTokens(user);

    return c.json(tokens);
  } catch (err) {
    return c.json({ error: "Token refresh failed", details: String(err) }, 401);
  }
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export function getCurrentUser(c: Context): AuthUser {
  const payload = c.get('jwtPayload');

  if (!payload) {
    throw new Error('Unauthenticated');
  }

  return {
    id: payload.sub,
    email: payload.email,
    role: payload.role,
  };
}

export async function getCurrentUserRoute(c: Context) {
  try {
    const user = getCurrentUser(c);
    return c.json(user);
  } catch {
    return c.json({ error: 'Unauthorized' }, 401);
  }
}
