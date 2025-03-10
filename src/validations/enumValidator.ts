import { z } from 'zod'
export const requestTypesSchemas = z.enum([
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
])
