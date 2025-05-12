import {PrismaClient} from '@prisma/client'

declare global{
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}

export const client = globalThis.prisma || new PrismaClient()

if (process.env.Node_ENV !== 'production') globalThis.prisma = client