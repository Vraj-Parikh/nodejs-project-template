import { createLogger, format, transports } from 'winston'
import {
    ConsoleTransportInstance,
    FileTransportInstance
} from 'winston/lib/winston/transports/index'
import parsedEnv from '../constants/env-parsed'
import { EApplicationEnvironment } from '../constants/application'
import path from 'path'
import util from 'util'
import * as sourceMapSupport from 'source-map-support'
import ApiErrorResponse from './api-error-response'

//Linking Trace Support
sourceMapSupport.install()

const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info
    const customLevel = level.toUpperCase()
    const customTimestamp = timestamp
    const customMessage = message
    const customMeta = util.inspect(meta, {
        depth: null,
        showHidden: true
    })
    return `${customLevel} [${customTimestamp}] ${customMessage}\nMETA ${customMeta}`
})
const consoleTransport = (): ConsoleTransportInstance => {
    return new transports.Console({
        level: 'info',
        format: format.combine(
            format.timestamp(),
            format.prettyPrint(),
            consoleLogFormat
        )
    })
}

const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info
    const logMeta: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(meta as object)) {
        if (value instanceof ApiErrorResponse) {
            const errors = value.response.errors
            if (!errors || errors.length === 0) {
                logMeta[key] = {
                    name: value.name,
                    message: value.message,
                    stack: value.stack || ''
                }
            } else {
                const allErrors = []
                for (const err of errors) {
                    allErrors.push({
                        name: err?.title,
                        message: err?.detail,
                        stack: value.stack || ''
                    })
                }
                logMeta[key] = allErrors
            }
        } else {
            logMeta[key] = value
        }
    }
    const logData = {
        level,
        message,
        timestamp,
        meta: JSON.stringify(logMeta)
    }
    return JSON.stringify(logData)
})
const fileTransport = (): Array<FileTransportInstance> => {
    const logFileName =
        parsedEnv.ENV === EApplicationEnvironment.DEVELOPMENT
            ? 'development.log'
            : 'production.log'
    return [
        new transports.File({
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat),
            filename: path.join(__dirname, '../../', 'logs', logFileName)
        })
    ]
}
const logger = createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...fileTransport()]
})

if (parsedEnv.ENV === EApplicationEnvironment.DEVELOPMENT) {
    logger.add(consoleTransport())
}
export default logger
