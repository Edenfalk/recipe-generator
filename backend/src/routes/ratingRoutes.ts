import { Router } from 'express'
import { validateJwt } from '../middleware/jwtMiddleware'
import { createRating } from '../controllers/ratingController'

const router = Router()

router.post('/', validateJwt, createRating)

export default router
