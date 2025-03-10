import { NextFunction, Request, Response } from 'express'
import { errorMessage } from '../constants/error-message.js'
import ApiErrorResponse from '../utils/api-error-response.js'
import { getResponseMetaData } from '../utils/get-response-meta-data.js'

export default function routeNotFoundHandler(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    const notFoundErrorResponse = new ApiErrorResponse(
        errorMessage.NOT_FOUND.code,
        errorMessage.NOT_FOUND.title
    )
    notFoundErrorResponse.setMeta(getResponseMetaData(req))
    notFoundErrorResponse.setError([
        {
            code: errorMessage.NOT_FOUND.code + '',
            title: errorMessage.NOT_FOUND.title,
            detail: errorMessage.NOT_FOUND.detail('Route')
        }
    ])
    next(notFoundErrorResponse)
}
