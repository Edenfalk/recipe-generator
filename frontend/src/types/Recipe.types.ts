import { TComment } from './Comments.types'
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
	time: string
	servings: string
	imageUrl: string
	isPublic: boolean
	comments: TComment[]
	ratings: TRatings[]
	createdAt: Date
	updatedAt: Date
	averageRating: string
}
