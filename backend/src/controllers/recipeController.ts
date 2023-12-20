// recipeController.ts
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createRecipe = async (req: Request, res: Response) => {
	try {
		const authorId = req.auth?.payload.sub

		if (!authorId) {
			return res.status(401).send('Unauthorized')
		}

		const {
			title,
			description,
			ingredients,
			instructions,
			servings,
			time,
		} = req.body

		const newRecipe = await prisma.recipe.create({
			data: {
				title,
				description,
				ingredients,
				instructions,
				servings,
				time,
				author: {
					connect: {
						auth0Id: authorId,
					},
				},
			},
		})
		console.log(newRecipe)
		res.status(201).json(newRecipe)
	} catch (error) {
		console.error(error)
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
