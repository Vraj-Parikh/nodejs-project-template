import { Response } from 'express'
import { TApiResponse, TApiResponseMeta } from '../types/api-response.js'

export function sendApiDataResponse(
    res: Response,
    statusCode: number,
    data: unknown,
    meta?: TApiResponseMeta
) {
    const response: TApiResponse = {
        meta: null,
        errors: null,
        data: null
    }
    response.data = data
    if (meta) {
        response.meta = meta
    }
    res.status(statusCode).json(response)
}
