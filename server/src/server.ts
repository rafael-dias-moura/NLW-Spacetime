import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
    origin: true //aceita req de qualquer url, em produção colocar url do front
})  

app.register(jwt, {
    secret: 'qualquerstringdoida004932kf0k9jf',
})

app.register(authRoutes)
app.register(memoriesRoutes)

app.listen({
    port: 3333,
}).then(() => {
    console.log('server in running on http://localhost:3333')
})