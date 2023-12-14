import { Router } from 'express'

const router = Router()

// Recipe

// Get all recipes. Pagination?
router.get('/recipes', (req, res) => {
	res.json({ message: 'nodemon fo sho' })
})

router.get('/recipes/:id', () => {})
router.put('/recipes/:id', () => {})
router.post('/recipes', () => {})
router.delete('/recipes/:id', () => {})

// Comments
// Get all comments for one recipe
router.get('/recipes/:recipeId/comments', () => {})
// Get one comment by id
router.get('/recipes/comments/:id', () => {})
// Update one comment by id
router.put('/comments/:id', () => {})
// Add comment for specific recipe
router.post('/recipes/:recipeId/comments', () => {})

router.delete('/comments/:id', () => {})

// Ratings
// Get all ratings for specific recipe
router.get('/recipes/:recipeId/ratings', () => {})
// Post rating for specific recipe
router.post('/recipes/:recipeId/ratings', () => {})
// Get average ratings for specific recipe
router.get('/recipes/:recipeId/ratings/average', () => {})

export default router
