import { Router } from 'express'
import {
	createRecipe,
	getMostCommentedRecipes,
	getMostRatedRecipes,
	getNewestRecipes,
	getRecipeById,
	getRecipes,
	getRecipesByUser,
	updateRecipe,
} from '../controllers/recipeController'
import { validateJwt } from '../middleware/jwtMiddleware'

const router = Router()

// Create a new recipe
router.post('/', validateJwt, createRecipe)

// Get recipe by user
router.get('/myrecipes', validateJwt, getRecipesByUser)

// Get all recipes
router.get('/', getRecipes)

router.get('/top10commented', getMostCommentedRecipes)

router.get('/top10mostrated', getMostRatedRecipes)

router.get('/rececentlyadded', getNewestRecipes)

// Get a single recipe by ID
router.get('/:id', getRecipeById)

// Update a recipe
router.patch('/:id', updateRecipe)

export default router
