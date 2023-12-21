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
		console.log(imageUrl)
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
		})

		res.status(200).json(recipes)
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}

export const getRecipes = async (req: Request, res: Response) => {
	// Logik för att hämta alla recept
}

export const getRecipeById = async (req: Request, res: Response) => {
	// Logik för att hämta ett recept med ett specifikt ID
}

export const updateRecipe = async (req: Request, res: Response) => {
	// Logik för att göra receptet isPublic: true
}

export const deleteRecipe = async (req: Request, res: Response) => {
	// Logik för att ta bort ett recept
}