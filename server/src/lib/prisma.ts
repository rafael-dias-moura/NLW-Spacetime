import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({ //para a query ser exibida
    log: ['query']
})