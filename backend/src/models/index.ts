import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    created_at: z.string().optional(),
});

export const PlanSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    created_at: z.string().optional(),
});

export const UpsertPlanSchema = PlanSchema.omit({ id: true, created_at: true });

export const RoutineSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    plan_id: z.string().uuid(),
    day_of_week: z.number(),
    created_at: z.string().optional(),
});

export const UpsertRoutineSchema = RoutineSchema.omit({ id: true, created_at: true });

export const ExerciseSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional(),
    tracking_type: z.string(),
    created_at: z.string().optional(),
});

export const UpsertExerciseSchema = ExerciseSchema.omit({ id: true, created_at: true });

export const RoutineExerciseSchema = z.object({
    routine_id: z.string().uuid(),
    exercise_id: z.string().uuid(),
});

export const ExerciseLogSchema = z.object({
    id: z.string().uuid().optional(),
    exercise_id: z.string().uuid(),
    routine_id: z.string().uuid(),
    metrics: z.record(z.any()),
    created_at: z.string().optional(),
});

export const UpsertExerciseLogSchema = ExerciseLogSchema.omit({ id: true, created_at: true });

export const RoutineResponseSchema = z.object({
    id: z.string().uuid().optional(),
    routine_id: z.string().uuid(),
    routine_name: z.string(),
    exercises: z.array(ExerciseSchema),
});

export type User = z.infer<typeof UserSchema>;
export type Plan = z.infer<typeof PlanSchema>;
export type UpsertPlan = z.infer<typeof UpsertPlanSchema>;
export type Routine = z.infer<typeof RoutineSchema>;
export type UpsertRoutine = z.infer<typeof UpsertRoutineSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type UpsertExercise = z.infer<typeof UpsertExerciseSchema>;
export type RoutineExercise = z.infer<typeof RoutineExerciseSchema>;
export type ExerciseLog = z.infer<typeof ExerciseLogSchema>;
export type UpsertExerciseLog = z.infer<typeof UpsertExerciseLogSchema>;
export type RoutineResponse = z.infer<typeof RoutineResponseSchema>;
