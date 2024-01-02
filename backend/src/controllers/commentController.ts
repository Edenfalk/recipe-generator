import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createComment = async (req: Request, res: Response) => {
	try {
		const authorId = req.auth?.payload.sub
		const { content, recipeId } = req.body

		if (!authorId) {
			return res.status(401).send('You need to log in to post comment')
		}
		if (!content || !recipeId) {
			return res.status(400).send('Content and recipe ID are required')
		}
		const comment = await prisma.comment.create({
			data: {
				content,
				recipeId,
				authorId,
			},
		})

		res.status(200).json(comment)
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}
