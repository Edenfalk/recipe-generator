import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser = async (req: Request, res: Response) => {
	try {
		const { email, nickname, auth0Id, picture } = req.body
		const user = await prisma.user.upsert({
			where: { auth0Id },
			update: {},
			create: { email, nickname, auth0Id, picture },
		})

		res.status(201).json(user)
	} catch (error) {
		console.error(error)
		res.status(500).send('Internal Server Error')
	}
}
