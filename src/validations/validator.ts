import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodSchema } from 'zod'
import { fromError } from 'zod-validation-error'
import { sendApiErrorResponse } from '../utils/api-error-response.js'
import { getResponseMetaData } from '../utils/get-response-meta-data.js'
import { errorMessage } from '../constants/error-message.js'
import { TApiResponseError } from '../types/api-response.js'

export function validator(schema: ZodSchema) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { success, error } = schema.safeParse(req)
        if (success) {
            next()
        }
        if (error instanceof ZodError) {
            const msg = fromError(error).toString()
            try {
                const { title, code } = errorMessage.VALIDATION_ERROR
                const meta = getResponseMetaData(req)
                const error: TApiResponseError[] = [
                    {
                        code: code + '',
                        title,
                        detail: msg
                    }
                ]
                sendApiErrorResponse(title, code, error, meta)
            } catch (error) {
                next(error)
            }
        }
        next(error)
    }
}
