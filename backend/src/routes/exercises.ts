import { Context } from 'hono';
import {
    UpsertRoutineSchema,
    UpsertExerciseSchema,
    RoutineExerciseSchema,
    UpsertExerciseLogSchema
} from '../models';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../lib/database';
import { getCurrentUser } from './auth';

export async function getRoutinesByPlan(c: Context) {
  const planId = c.req.param('planId');

  try {
    const result = await query(
      'SELECT * FROM routines WHERE plan_id = $1',
      [planId]
    );

    if (result.rowCount === 0) {
      return c.json({ error: 'No routines found for this plan' }, 404);
    }

    return c.json(result.rows);
  } catch (err) {
    return c.json(
      { error: 'Failed to retrieve routines', details: String(err) },
      500
    );
  }
}


export async function createRoutine(c: Context) {
  try {
    const body = await c.req.json();
    const routineData = UpsertRoutineSchema.parse(body);

    const result = await query(
      `INSERT INTO routines (name, day_of_week, plan_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [routineData.name, routineData.day_of_week, routineData.plan_id]
    );

    return c.json(result.rows[0]);
  } catch (err) {
    return c.json(
      { error: 'Failed to create routine', details: String(err) },
      500
    );
  }
}

export async function getRoutineExercises(c: Context) {
  const routineId = c.req.param('routineId');

  try {
    // Check routine exists
    const routineResult = await query(
      'SELECT id, name FROM routines WHERE id = $1',
      [routineId]
    );

    if (routineResult.rowCount === 0) {
      return c.json({ error: 'Routine not found' }, 404);
    }

    // Fetch exercises in routine
    const exercisesResult = await query(
      `SELECT e.id, e.name, e.description, e.tracking_type
       FROM routines_exercises re
       JOIN exercises e ON re.exercise_id = e.id
       WHERE re.routine_id = $1`,
      [routineId]
    );

    return c.json({
      routineId: routineId,
      routine_name: routineResult.rows[0].name,
      exercises: exercisesResult.rows,
    });
  } catch (err) {
    return c.json(
      { error: 'Failed to retrieve exercises', details: String(err) },
      500
    );
  }
}

export async function createExercise(c: Context) {
  try {
    const body = await c.req.json();
    const exerciseData = UpsertExerciseSchema.parse(body);

    const result = await query(
      `INSERT INTO exercises (name, description, tracking_type)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [
        exerciseData.name,
        exerciseData.description,
        exerciseData.tracking_type,
      ]
    );

    return c.json(result.rows[0]);
  } catch (err) {
    return c.json(
      { error: "Failed to create exercise", details: String(err) },
      500
    );
  }
}
export async function addExerciseToRoutine(c: Context) {
  try {
    const body = await c.req.json();
    const routineId = c.req.param("routineId");

    const routineRelation = RoutineExerciseSchema.parse({
      ...body,
      routine_id: routineId,
    });

    // Check routine exists
    const routineResult = await query(
      "SELECT id, name FROM routines WHERE id = $1",
      [routineRelation.routine_id]
    );
    if (routineResult.rowCount === 0) {
      return c.json({ error: "Routine not found" }, 404);
    }

    // Check exercise exists
    const exerciseResult = await query(
      "SELECT id, name, description FROM exercises WHERE id = $1",
      [routineRelation.exercise_id]
    );
    if (exerciseResult.rowCount === 0) {
      return c.json({ error: "Exercise not found" }, 404);
    }

    // Insert relation
    await query(
      `INSERT INTO routine_exercises (routine_id, exercise_id)
       VALUES ($1, $2)`,
      [routineRelation.routine_id, routineRelation.exercise_id]
    );

    return c.json({
      routine_id: routineResult.rows[0].id,
      routine_name: routineResult.rows[0].name,
      exercise: exerciseResult.rows[0],
    });
  } catch (err) {
    return c.json(
      { error: "Failed to add exercise to routine", details: String(err) },
      500
    );
  }
}
export async function getExercises(c: Context) {
  try {
    const result = await query(
      "SELECT id, name, description, tracking_type FROM exercises"
    );

    return c.json(result.rows);
  } catch (err) {
    return c.json(
      { error: "Failed to retrieve exercises", details: String(err) },
      500
    );
  }
}

export async function logExercise(c: Context) {
  try {
    const body = await c.req.json();
    const logData = UpsertExerciseLogSchema.parse(body);

    const userResult = await getCurrentUser(c)

    const accountIdObject = await userResult.json()

    const accountId = accountIdObject.id

    // Fetch exercise details
    const exerciseResult = await query(
      "SELECT id, name, tracking_type, description FROM exercises WHERE id = $1",
      [logData.exercise_id]
    );
    if (exerciseResult.rowCount === 0) {
      return c.json({ error: "Exercise not found" }, 404);
    }
    const exercise = exerciseResult.rows[0];

    // Insert log
    const logResult = await query(
      `INSERT INTO exercise_logs (account_id, exercise_id, metrics, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [
        accountId,
        logData.exercise_id,
        logData.metrics,
      ]
    );

    const insertedLog = logResult.rows[0];

    return c.json({
      ...insertedLog,
      exercise,
    });
  } catch (err) {
    return c.json(
      { error: "Failed to log exercise", details: String(err) },
      500
    );
  }
}

export async function getExerciseLogsByUser(c: Context) {
  const userResult = await getCurrentUser(c)
  const accountIdObject = await userResult.json()
  const accountId = accountIdObject.id

  try {
    const result = await query(`
      SELECT
        l.id,
        l.metrics,
        l.created_at,
        l.exercise_id,
        l.routine_id,
        e.id as ex_id,
        e.name as ex_name,
        e.tracking_type as ex_tracking_type,
        e.description as ex_description,
        r.id as routine_id,
        r.name as routine_name,
        r.day_of_week,
        p.id as plan_id,
        p.name as plan_name
      FROM exercise_logs l
      JOIN exercises e ON l.exercise_id = e.id
      JOIN routines r ON l.routine_id = r.id
      JOIN plans p ON r.plan_id = p.id
      WHERE p.account_id = $1
      ORDER BY l.created_at DESC
    `, [accountId]);

    const formattedLogs = result.rows.map((row) => ({
      id: row.id,
      metrics: row.metrics,
      created_at: row.created_at,
      exercise_id: row.exercise_id,
      routine_id: row.routine_id,
      plan_id: row.plan_id,
      // routine_id: row.routine,
      exercise: {
        id: row.ex_id,
        name: row.ex_name,
        tracking_type: row.ex_tracking_type,
        description: row.ex_description,
      },
      plan: {
        id: row.plan_id,
        name: row.plan_name
      },
      routine: {
        id: row.routine_id,
        name: row.rountine_name,
        day_of_week: row.day_of_week
      }
    }));

    return c.json(formattedLogs);
  } catch (err) {
    return c.json(
      { error: "Failed to retrieve exercise logs", details: String(err) },
      500
    );
  }
}

