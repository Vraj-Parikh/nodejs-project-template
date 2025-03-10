import { Router } from 'express'
import authRouter from '../services/auth/routes/auth-route.js'

const apiRoutes = Router()

apiRoutes.use('/auth', authRouter)

export default apiRoutes
