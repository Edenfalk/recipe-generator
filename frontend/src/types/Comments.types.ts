import { TLike } from './Likes.types'
import { TRecipe } from './Recipe.types'
import { TUser } from './User.types'

export type TComment = {
	id: string
	content: string
	recipe: TRecipe
	recipeId: string
	author: TUser
	authorId: string
	createdAt: Date
	likes: TLike[]
}

export type TCreateComment = {
	recipeId: string
	content: string
}
