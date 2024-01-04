import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createRating = async (req: Request, res: Response) => {
	try {
		const { recipeId, value } = req.body
		const authorId = req.auth?.payload.sub

		if (value < 1 || value > 5) {
			return res.status(400).send('Rating must be between 1 and 5')
		}

		if (!authorId) {
			return res.status(401).send('You need to log in to post comment')
		}

		// Letar efter en befintlig rating från användaren
		const existingRating = await prisma.rating.findFirst({
			where: {
				authorId: authorId,
				recipeId: recipeId,
			},
		})

		// Radera befintlig rating om den finns
		if (existingRating) {
			await prisma.rating.delete({
				where: { id: existingRating.id },
			})
		}

		// Skapa en ny rating
		const rating = await prisma.rating.create({
			data: {
				recipeId,
				authorId,
				value,
			},
		})

		res.status(201).json(rating)
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}
