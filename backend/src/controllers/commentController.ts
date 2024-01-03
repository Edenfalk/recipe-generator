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

export const deleteComment = async (req: Request, res: Response) => {
	try {
		const authorId = req.auth?.payload.sub
		const commentId = req.params.commentId

		if (!authorId) {
			return res.status(401).send('You need to log in to delete comment')
		}
		if (!commentId) {
			return res.status(400).send('comment ID is required')
		}
		const comment = await prisma.comment.delete({
			where: {
				id: commentId,
				authorId: authorId,
			},
		})

		res.status(200).json(comment)
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}

export const getCommentsForRecipe = async (req: Request, res: Response) => {
	try {
		const recipeId = req.params.recipeId

		if (!recipeId) {
			return res.status(400).send('recipeId is required')
		}
		const comments = await prisma.comment.findMany({
			where: {
				recipeId: recipeId,
			},
		})

		res.status(200).json(comments)
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}
