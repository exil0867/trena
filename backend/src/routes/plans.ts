import { Context } from 'hono';
import { UpsertPlanSchema } from '../models';
import { query } from '../lib/database';

export async function getPlan(c: Context) {
  const planId = c.req.param("id");

  try {
    const result = await query("SELECT * FROM plans WHERE id = $1", [planId]);

    if (result.rowCount === 0) {
      return c.json({ error: "Plan not found" }, 404);
    }

    return c.json(result.rows[0]);
  } catch (err) {
    return c.json(
      { error: "Failed to retrieve plan", details: String(err) },
      500
    );
  }
}


export async function createPlan(c: Context) {
  try {
    const body = await c.req.json();
    const planData = UpsertPlanSchema.parse(body);

    const result = await query(
      `INSERT INTO plans (name)
       VALUES ($1)
       RETURNING *`,
      [
        planData.name,
      ]
    );

    return c.json(result.rows[0]);
  } catch (err) {
    return c.json(
      { error: "Failed to create plan", details: String(err) },
      500
    );
  }
}

export async function getPlans(c: Context) {
  try {
    const result = await query("SELECT * FROM plans");

    return c.json(result.rows);
  } catch (err) {
    return c.json(
      { error: "Failed to retrieve plans", details: String(err) },
      500
    );
  }
}
export async function getExerciseGroupsByPlan(c: Context) {
  const planId = c.req.param('id');

  try {
    const result = await query(
      `SELECT id, plan_id, day_of_week, name
       FROM routines
       WHERE plan_id = $1
       ORDER BY day_of_week`,
      [planId]
    );

    return c.json(result.rows);
  } catch (err) {
    return c.json({ error: 'Failed to fetch plan groups', details: String(err) }, 500);
  }
}

