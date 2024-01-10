import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import OpenAI from 'openai'
import { uploadImageAndGetUrl } from '../helpers/imageStorage'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

const prisma = new PrismaClient()

export const createRecipe = async (req: Request, res: Response) => {
	try {
		const authorId = req.auth?.payload.sub

		if (!authorId) {
			return res.status(401).send('Unauthorized')
		}
		const recipeId = uuidv4()

		const {
			title,
			description,
			ingredients,
			instructions,
			servings,
			time,
		} = req.body

		const response = await openai.images.generate({
			model: 'dall-e-3',
			prompt: `Create a hyper-realistic image of the dish titled '${title}'. The dish, described as '${description}', should be presented in a clean and professional style, focused closely on the food. Please use a simple, elegant white background to highlight the dish, ensuring the food looks appetizing and inviting without any background distractions.
            `,
			n: 1,
			size: '1024x1024',
		})
		const tempImageUrl = response.data[0].url
		if (!tempImageUrl) {
			throw new Error(
				'Failed to retrieve image URL from OpenAI response.'
			)
		}
		const imageUrl = await uploadImageAndGetUrl(tempImageUrl, recipeId)
		const newRecipe = await prisma.recipe.create({
			data: {
				id: recipeId,
				title,
				description,
				ingredients,
				instructions,
				servings,
				imageUrl,
				time,
				author: {
					connect: {
						auth0Id: authorId,
					},
				},
			},
		})
		res.status(201).json(newRecipe)
	} catch (error) {
		console.error(error)
		res.status(500).send('Internal Server Error')
	}
}

export const getRecipesByUser = async (req: Request, res: Response) => {
	try {
		const authorId = req.auth?.payload.sub

		if (!authorId) {
			return res
				.status(401)
				.send('You need to log in to see your recipes')
		}

		const recipes = await prisma.recipe.findMany({
			where: {
				authorId: authorId,
			},
			include: {
				comments: true,
				ratings: true,
			},
		})
		const recipesWithAverageRatings = recipes.map((recipe) => {
			let averageRating = 0
			if (recipe.ratings.length > 0) {
				averageRating =
					recipe.ratings.reduce(
						(sum, rating) => sum + rating.value,
						0
					) / recipe.ratings.length
			}
			return {
				...recipe,
				averageRating: averageRating.toFixed(1),
			}
		})

		res.status(200).json(recipesWithAverageRatings)
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}

export const getRecipes = async (req: Request, res: Response) => {
	try {
		const publicRecipes = await prisma.recipe.findMany({
			where: {
				isPublic: true,
			},
			include: {
				comments: true,
				ratings: true,
			},
		})
		const recipesWithAverageRatings = publicRecipes.map((recipe) => {
			let averageRating = 0
			if (recipe.ratings.length > 0) {
				averageRating =
					recipe.ratings.reduce(
						(sum, rating) => sum + rating.value,
						0
					) / recipe.ratings.length
			}
			return {
				...recipe,
				averageRating: averageRating.toFixed(1),
			}
		})
		res.status(200).json(recipesWithAverageRatings)
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}

export const getRecipeById = async (req: Request, res: Response) => {
	// Logik för att hämta ett recept med ett specifikt ID ink kommentarer och like
	try {
		const recipeId = req.params.id

		const recipe = await prisma.recipe.findUnique({
			where: {
				id: recipeId,
			},
			include: {
				comments: {
					where: {
						recipeId: recipeId,
					},
					include: {
						author: true,
						_count: {
							select: { likes: true },
						},
					},
				},
				ratings: true,
			},
		})

		let averageRating = 0
		if (recipe && recipe.ratings.length > 0) {
			averageRating =
				recipe.ratings.reduce((sum, rating) => sum + rating.value, 0) /
				recipe.ratings.length
		}

		res.status(200).json({
			...recipe,
			averageRating: averageRating.toFixed(1),
		})
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}

export const updateRecipe = async (req: Request, res: Response) => {
	// Logik för att göra receptet isPublic: truef
	try {
		const recipeId = req.params.id
		const { isPublic } = req.body
		const updatedRecipe = await prisma.recipe.update({
			where: {
				id: recipeId,
			},
			data: {
				isPublic,
			},
		})
		res.status(200).json(updatedRecipe)
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}

export const deleteRecipe = async (req: Request, res: Response) => {
	// Logik för att ta bort ett recept
}

export const getMostCommentedRecipes = async (req: Request, res: Response) => {
	try {
		const recipes = await prisma.recipe.findMany({
			where: { isPublic: true },
			include: {
				comments: true,
				ratings: true,
			},
			orderBy: [
				{
					comments: {
						_count: 'desc',
					},
				},
			],
			take: 10,
		})

		const recipesWithAverageRatings = recipes.map((recipe) => {
			let averageRating = 0
			if (recipe.ratings.length > 0) {
				averageRating =
					recipe.ratings.reduce(
						(sum, rating) => sum + rating.value,
						0
					) / recipe.ratings.length
			}
			return {
				...recipe,
				averageRating: averageRating.toFixed(1),
			}
		})

		res.status(200).json(recipesWithAverageRatings)
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}

export const getNewestRecipes = async (req: Request, res: Response) => {
	try {
		const newRecipes = await prisma.recipe.findMany({
			where: { isPublic: true },
			include: {
				comments: true,
				ratings: true,
			},
			orderBy: { createdAt: 'desc' },
			take: 10,
		})
		const recipesWithAverageRatings = newRecipes.map((recipe) => {
			let averageRating = 0
			if (recipe.ratings.length > 0) {
				averageRating =
					recipe.ratings.reduce(
						(sum, rating) => sum + rating.value,
						0
					) / recipe.ratings.length
			}
			return {
				...recipe,
				averageRating: averageRating.toFixed(1),
			}
		})
		res.status(200).json(recipesWithAverageRatings)
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}

export const getMostRatedRecipes = async (req: Request, res: Response) => {
	try {
		const recipes = await prisma.recipe.findMany({
			where: { isPublic: true },
			include: {
				comments: true,
				ratings: true,
			},
			orderBy: [
				{
					ratings: {
						_count: 'desc',
					},
				},
			],
			take: 10,
		})

		const recipesWithAverageRatings = recipes.map((recipe) => {
			let averageRating = 0
			if (recipe.ratings.length > 0) {
				averageRating =
					recipe.ratings.reduce(
						(sum, rating) => sum + rating.value,
						0
					) / recipe.ratings.length
			}
			return {
				...recipe,
				averageRating: averageRating.toFixed(1),
			}
		})

		res.status(200).json(recipesWithAverageRatings)
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}
