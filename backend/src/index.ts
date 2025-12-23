import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { jwt } from 'hono/jwt';
import { config } from './config.js';
// import { createClient } from '@supabase/supabase-js';
import * as routes from './routes/index.js';
import { serve } from '@hono/node-server';

// Create a Supabase client
// export const supabase = createClient(config.supabaseUrl, config.supabaseKey);

// Create a Hono app
const app = new Hono();

// Add CORS middleware
app.use(cors({
    origin: 'http://localhost:8081',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
}));

// Auth middleware (exclude certain routes)
const excludedPaths = ['/auth/signup', '/auth/login', '/auth/refresh', '/auth/user'];

// app.use('*', async (c, next) => {
//     const path = c.req.path;
//     if (excludedPaths.includes(path)) {
//         return next();
//     }

//     // Continue with JWT authentication
//     const jwtMiddleware = jwt({
//         secret: config.jwtSecret,
//     });

//     return jwtMiddleware(c, next);
// });

// Auth routes
app.post('/auth/signup', routes.signUp);
app.post('/auth/login', routes.signIn);
app.post('/auth/refresh', routes.refreshToken);
app.get('/auth/user', routes.getCurrentUser);

// Plan routes
app.get('/plans/:id', routes.getPlan);
app.post('/plans', routes.createPlan);
app.get('/plans', routes.getPlans);

// Routines routes
app.get('/plans/:planId/routines', routes.getRoutinesByPlan);
app.post('/routine', routes.createRoutine);
app.get('/routine/:routineId/exercises', routes.getRoutineExercises);
app.post('/routines/:routineId/exercises', routes.addExerciseToRoutine);

// Exercise routes
app.post('/exercises', routes.createExercise);
app.get('/exercises', routes.getExercises);

// Exercise log routes
app.post('/exercise-logs', routes.logExercise);
app.get('/users/exercise-logs', routes.getExerciseLogsByUser);

app.get('/exercise-groups', routes.getExerciseGroups);
app.post('/exercise-groups', routes.createExerciseGroup);
app.get('/exercise-groups/:id/exercises', routes.getExerciseGroupExercises);
app.post('/exercise-groups/:id/exercises', routes.addExerciseToExerciseGroup);
app.get('/plans/:id/groups', routes.getExerciseGroupsByPlan);


const port = Number(config.port ?? 3004);

serve({
  fetch: app.fetch,
  port,
});

console.log(`Server is running on port ${port}`);
