import express from 'express'
import cookieParser from 'cookie-parser'
import apiRoutes from './routes/api-routes.js'
import helmet from 'helmet'
import generateRequestId from './middleware/generate-request-id.js'
import cors from 'cors'
import corsConfig from './config/cors.js'
import globalErrorHandler from './middleware/global-error-handler.js'
import routeNotFoundHandler from './middleware/route-not-found-handler.js'
import path from 'path'

const app = express()

// middlewares
app.use(express.json({ limit: '50kb' }))
app.use(express.static(path.join(import.meta.dirname, '../', 'public')))
app.use(cookieParser())
app.use(cors(corsConfig))
app.use(helmet())
app.use(generateRequestId)

// all api routes
app.use('/api/v1', apiRoutes)

// 404 handler
app.use(routeNotFoundHandler)

// global error handler
app.use(globalErrorHandler)

export default app
