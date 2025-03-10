import { Request } from 'express'
import { TApiResponseMeta } from '../types/api-response'
import { requestTypesSchemas } from '../validations/enumValidator'

export function getResponseMetaData(req: Request): TApiResponseMeta {
    const { data, success, error } = requestTypesSchemas.safeParse(req.method)
    if (!success) {
        throw error
    }
    const meta: TApiResponseMeta = {
        //@ts-expect-error custom id added
        requestId: req.id,
        timestamp: new Date().toISOString(),
        url: req.originalUrl,
        method: data
    }
    return meta
}
