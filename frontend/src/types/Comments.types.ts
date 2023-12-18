import { TRecipe } from './Recipe.types'
import { TUser } from './User.types'

export type TComments = {
	id: string
	content: string
	recipe: TRecipe
	recipeId: string
	author: TUser
	authorId: string
	createdAt: Date
}
