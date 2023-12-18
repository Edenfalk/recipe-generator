import { TRecipe } from './Recipe.types'
import { TUser } from './User.types'

export type TRatings = {
	id: string
	value: number
	recipe: TRecipe
	recipeId: string
	author: TUser
	authorId: string
	createdAt: Date
}
