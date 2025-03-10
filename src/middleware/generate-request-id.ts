import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
export default function generateRequestId(
    req: Request,
    _: Response,
    next: NextFunction
) {
    const reqId = uuidv4()
    //@ts-expect-error custom id added
    req.id = reqId
    next()
}
