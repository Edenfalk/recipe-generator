import { Router } from 'express'
import { createUser } from '../controllers/userController'
import { validateJwt } from '../middleware/jwtMiddleware'

const router = Router()

router.post('/', validateJwt, createUser)

export default router
