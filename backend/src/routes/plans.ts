import { Context } from 'hono';
import { UpsertPlanSchema } from '../models/index.js';
import { query } from '../lib/database/index.js';
import { getCurrentUser } from './auth.js';

export async function getPlan(c: Context) {
  const planId = c.req.param('id');

  try {
    const { id: accountId } = getCurrentUser(c);

    const result = await query(
      `SELECT id, name, created_at
       FROM plans
       WHERE id = $1 AND account_id = $2`,
      [planId, accountId]
    );

    if (result.rowCount === 0) {
      return c.json({ error: 'Plan not found' }, 404);
    }

    return c.json(result.rows[0]);
  } catch (err) {
    return c.json(
      { error: 'Failed to retrieve plan', details: String(err) },
      500
    );
  }
}


export async function createPlan(c: Context) {
  try {
    const { id: accountId } = getCurrentUser(c);

    const body = await c.req.json();
    const planData = UpsertPlanSchema.parse(body);

    const result = await query(
      `INSERT INTO plans (account_id, name)
       VALUES ($1, $2)
       RETURNING id, name, created_at`,
      [accountId, planData.name]
    );

    return c.json(result.rows[0]);
  } catch (err) {
    return c.json(
      { error: 'Failed to create plan', details: String(err) },
      500
    );
  }
}

export async function getPlans(c: Context) {
  try {
    const { id: accountId } = getCurrentUser(c);

    const result = await query(
      `SELECT id, name, created_at
       FROM plans
       WHERE account_id = $1
       ORDER BY created_at DESC`,
      [accountId]
    );

    return c.json(result.rows);
  } catch (err) {
    return c.json(
      { error: 'Failed to retrieve plans', details: String(err) },
      500
    );
  }
}

export async function getExerciseGroupsByPlan(c: Context) {
  const planId = c.req.param('id');

  try {
    const { id: accountId } = getCurrentUser(c);

    const result = await query(
      `SELECT r.id, r.plan_id, r.day_of_week, r.name
       FROM routines r
       JOIN plans p ON r.plan_id = p.id
       WHERE r.plan_id = $1
         AND p.account_id = $2
       ORDER BY r.day_of_week`,
      [planId, accountId]
    );

    return c.json(result.rows);
  } catch (err) {
    return c.json(
      { error: 'Failed to fetch plan groups', details: String(err) },
      500
    );
  }
}
