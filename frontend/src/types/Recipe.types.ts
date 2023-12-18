import { TComments } from './Comments.types'
import { TRatings } from './Ratings.types'
import { TUser } from './User.types'

export type TOpenAiRecipe = {
	title: string
	description: string
	ingredients: string[]
	time: string
	servings: string
	instructions: string[]
}

export type TRecipe = {
	id: string
	author: TUser
	authorId: string
	title: string
	description: string
	ingredients: string[]
	instructions: string[]
	isPublic: boolean
	comments: TComments[]
	ratings: TRatings[]
	createdAt: Date
	updatedAt: Date
}
