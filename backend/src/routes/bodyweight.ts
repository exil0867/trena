import { Context } from 'hono';
import { query } from '../lib/database/index.js';
import { getCurrentUser } from './auth.js';
import { UpsertBodyweightLogSchema } from '../models/index.js';

function lbToKg(lb: number): number {
  return Math.round(lb * 0.45359237 * 100) / 100;
}

export async function logBodyweight(c: Context) {
  try {
    const body = await c.req.json();
    const data = UpsertBodyweightLogSchema.parse(body);

    const userResult = await getCurrentUser(c);
    const { id: accountId } = await userResult.json();

    const weightKg =
      data.unit === 'lb' ? lbToKg(data.value) : data.value;

    const recordedAt = data.recorded_at
      ? new Date(data.recorded_at)
      : new Date();

    const result = await query(
      `INSERT INTO bodyweight_logs
       (account_id, weight_kg, original_unit, original_value, notes, recorded_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        accountId,
        weightKg,
        data.unit,
        data.value,
        data.notes ?? null,
        recordedAt,
      ]
    );

    return c.json(result.rows[0]);
  } catch (err) {
    return c.json(
      { error: 'Failed to log bodyweight', details: String(err) },
      500
    );
  }
}

export async function getBodyweightLogsByUser(c: Context) {
  try {
    const userResult = await getCurrentUser(c);
    const { id: accountId } = await userResult.json();

    const result = await query(
      `SELECT
         id,
         weight_kg,
         original_value,
         original_unit,
         notes,
         recorded_at,
         created_at
       FROM bodyweight_logs
       WHERE account_id = $1
       ORDER BY recorded_at DESC`,
      [accountId]
    );

    return c.json(result.rows);
  } catch (err) {
    return c.json(
      { error: 'Failed to retrieve bodyweight logs', details: String(err) },
      500
    );
  }
}
