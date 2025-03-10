import { Router } from 'express'
import { validator } from '../../../validations/validator'
import { loginSchema } from '../validations/login'
import { loginHandler } from '../controller/login'
import asyncHandler from 'express-async-handler'

const authRouter = Router()

authRouter.post('/login', validator(loginSchema), asyncHandler(loginHandler))

export default authRouter
