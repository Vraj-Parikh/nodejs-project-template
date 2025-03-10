import express from 'express'
import cookieParser from 'cookie-parser'
import apiRoutes from './routes/api-routes'
import helmet from 'helmet'
import generateRequestId from './middleware/generate-request-id'
import cors from 'cors'
import corsConfig from './config/cors'
import globalErrorHandler from './middleware/global-error-handler'
import routeNotFoundHandler from './middleware/route-not-found-handler'
import path from 'path'

const app = express()

// middlewares
app.use(express.json({ limit: '50kb' }))
app.use(express.static(path.join(__dirname, '../', 'public')))
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
