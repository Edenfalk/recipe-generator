import { Router } from 'express'
import {
	createComment,
	deleteComment,
	getCommentsForRecipe,
} from '../controllers/commentController'
import { validateJwt } from '../middleware/jwtMiddleware'

const router = Router()

router.post('/', createComment)

router.delete('/:commentId', validateJwt, deleteComment)

router.get('/recipe/:recipeId', getCommentsForRecipe)

export default router
