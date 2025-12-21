import { Context } from "hono";
import { query } from "../lib/database/index.js";

export async function getExerciseGroups(c: Context) {
  const planId = c.req.query('plan_id');

  try {
    const result = planId
      ? await query(
          `SELECT id, plan_id, day_of_week, name
           FROM routines
           WHERE plan_id = $1
           ORDER BY day_of_week`,
          [planId]
        )
      : await query(
          `SELECT id, plan_id, day_of_week, name
           FROM routines
           ORDER BY day_of_week`
        );

    return c.json(result.rows);
  } catch (err) {
    return c.json({ error: 'Failed to fetch exercise groups', details: String(err) }, 500);
  }
}


export async function createExerciseGroup(c: Context) {
  try {
    const body = await c.req.json();
    const { name, plan_id, day_of_week } = body;

    const result = await query(
      `INSERT INTO routines (name, plan_id, day_of_week)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, plan_id, day_of_week]
    );

    return c.json(result.rows[0]);
  } catch (err) {
    return c.json({ error: 'Failed to create exercise group', details: String(err) }, 500);
  }
}

export async function getExerciseGroupExercises(c: Context) {
  const groupId = c.req.param('id');

  try {
    const result = await query(
      `SELECT
         re.id as routine_exercise_id,
         e.id,
         e.name,
         e.description,
         e.tracking_type
       FROM routine_exercises re
       JOIN exercises e ON e.id = re.exercise_id
       WHERE re.routine_id = $1`,
      [groupId]
    );

    return c.json({
      exercise_group_id: groupId,
      exercises: result.rows,
    });
  } catch (err) {
    return c.json({ error: 'Failed to fetch group exercises', details: String(err) }, 500);
  }
}

export async function addExerciseToExerciseGroup(c: Context) {
  const groupId = c.req.param('id');

  try {
    const body = await c.req.json();
    const { exercise_id } = body;

    await query(
      `INSERT INTO routine_exercises (routine_id, exercise_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [groupId, exercise_id]
    );

    const exercise = await query(
      `SELECT id, name, description, tracking_type
       FROM exercises
       WHERE id = $1`,
      [exercise_id]
    );

    return c.json({
      exercise_group_id: groupId,
      exercise: exercise.rows[0],
    });
  } catch (err) {
    return c.json({ error: 'Failed to add exercise to group', details: String(err) }, 500);
  }
}
