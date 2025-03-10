import { z } from 'zod'

const envSchema = z.object({
    ENV: z.string(),
    PORT: z.number(),
    DB_URL: z.string()
})

const envInitial = {
    ENV: process.env.ENV,
    PORT: parseInt(process.env.PORT!),
    DB_URL: process.env.DB_URL
}

const { success, data } = envSchema.safeParse(envInitial)

if (!success) {
    process.exit(1)
}

const envParsed = data
export default envParsed
