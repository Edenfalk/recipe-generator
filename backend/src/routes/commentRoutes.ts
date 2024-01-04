import { Router } from 'express'
import {
	createComment,
	deleteComment,
	getCommentsForRecipe,
	likeComment,
	likedByUser,
} from '../controllers/commentController'
import { validateJwt } from '../middleware/jwtMiddleware'

const router = Router()

router.post('/', validateJwt, createComment)

router.delete('/:commentId', validateJwt, deleteComment)

router.get('/recipe/:recipeId', getCommentsForRecipe)

router.post('/:commentId/like', validateJwt, likeComment)

router.get('/:commentId/likedByUser', validateJwt, likedByUser)

export default router
