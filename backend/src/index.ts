import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { authRoutes } from './modules/auth/routes/auth.js'
import { meRoutes } from './modules/auth/routes/me.js'

const app = new Hono()

app.route('/auth', authRoutes)

app.route('/', meRoutes)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 3003
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
