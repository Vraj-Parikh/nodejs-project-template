import { Request, Response } from 'express'
import { getResponseMetaData } from '../../../utils/get-response-meta-data.js'
import { sendApiDataResponse } from '../../../utils/api-data-response.js'
import { successMessage } from '../../../constants/success-message.js'

export function loginHandler(req: Request, res: Response) {
    const success = false
    if (!success) {
        throw new Error('login error')
    }
    const meta = getResponseMetaData(req)
    sendApiDataResponse(
        res,
        successMessage.OK.code,
        {
            id: 1,
            role: 'admin',
            name: 'vraj'
        },
        meta
    )
}
