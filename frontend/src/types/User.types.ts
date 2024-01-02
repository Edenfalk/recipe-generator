import { TComment } from './Comments.types'
import { TRatings } from './Ratings.types'
import { TRecipe } from './Recipe.types'

export type TUser = {
	id: string
	auth0Id: string
	email: string
	nickname: string
	recipes: TRecipe[]
	comments: TComment[]
	ratings: TRatings[]
	createdAt: Date
	updatedAt: Date
}

export type TNewUser = {
	email: string
	nickname: string
	auth0Id: string
}
