import '@fastify/jwt'

declare module '@fastify/jwt' {//interface para o typescript
    export interface FastifyJWT {
        user: {
            sub: string
            name: string
            avatarUrl: string
        }
    }
}