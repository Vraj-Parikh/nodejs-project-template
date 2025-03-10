import { Router } from 'express'
import { validator } from '../../../validations/validator.js'
import { loginSchema } from '../validations/login.js'
import { loginHandler } from '../controller/login.js'
import asyncHandler from 'express-async-handler'

const authRouter = Router()

authRouter.post('/login', validator(loginSchema), asyncHandler(loginHandler))

export default authRouter
