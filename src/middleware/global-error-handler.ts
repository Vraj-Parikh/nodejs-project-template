import { Request, Response } from 'express'
import ApiErrorResponse from '../utils/api-error-response.js'
import { errorMessage } from '../constants/error-message.js'
import { getResponseMetaData } from '../utils/get-response-meta-data.js'
import logger from '../utils/logger.js'

export default function globalErrorHandler<T extends Error>(
    error: T,
    req: Request,
    res: Response
) {
    if (error instanceof ApiErrorResponse) {
        logger.error(error.message, {
            meta: { ...error.response.meta, error }
        })
        res.status(error.statusCode).json(error.getResponse())
        return
    }
    logger.error('Api Error', {
        meta: { error }
    })
    const unexpectedErrorResponse = new ApiErrorResponse(
        errorMessage.SERVER_ERROR.code,
        errorMessage.SERVER_ERROR.title
    )
    unexpectedErrorResponse.setError([
        {
            code: errorMessage.SERVER_ERROR.code + '',
            title: errorMessage.SERVER_ERROR.title,
            detail: errorMessage.SERVER_ERROR.detail
        }
    ])
    const meta = getResponseMetaData(req)
    unexpectedErrorResponse.setMeta(meta)
    res.status(unexpectedErrorResponse.statusCode).json(
        unexpectedErrorResponse.getResponse()
    )
}
