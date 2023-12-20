import { Router } from 'express'
import {
	createRecipe,
	deleteRecipe,
	getRecipeById,
	getRecipes,
	getRecipesByUser,
	updateRecipe,
} from '../controllers/recipeController'

const router = Router()

// Create a new recipe
router.post('/', createRecipe)

// Get recipe by user
router.get('/myrecipes', getRecipesByUser)

// Get all recipes
router.get('/', getRecipes)

// Get a single recipe by ID
router.get('/:id', getRecipeById)

// Update a recipe
router.put('/:id', updateRecipe)

// Delete a recipe
router.delete('/:id', deleteRecipe)

export default router
