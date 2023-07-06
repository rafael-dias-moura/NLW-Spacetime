import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
    root: resolve(__dirname, '../uploads'),
    prefix: '/uploads/',
})

app.register(cors, {
    origin: true //aceita req de qualquer url, em produção colocar url do front
})  

app.register(jwt, {
    secret: 'qualquerstring004932kf0k9jf',
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app.listen({
    port: 3333,
    host: '0.0.0.0',
}).then(() => {
    console.log('server in running on http://localhost:3333')
})