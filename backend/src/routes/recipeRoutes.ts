import { Router } from 'express'
import {
	createRecipe,
	deleteRecipe,
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

// Get a single recipe by ID
router.get('/:id', getRecipeById)

// Update a recipe
router.patch('/:id', updateRecipe)

// Delete a recipe
router.delete('/:id', deleteRecipe)

export default router
