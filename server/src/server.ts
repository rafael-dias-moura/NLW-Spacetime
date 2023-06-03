import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
    origin: true //aceita req de qualquer url, em produção colocar url do front
})  
app.register(memoriesRoutes)

app.listen({
    port: 3333,
}).then(() => {
    console.log('server in running on http://localhost:3333')
})