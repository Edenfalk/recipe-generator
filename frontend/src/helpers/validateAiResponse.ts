/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOpenAiRecipe } from '@/types/Recipe.types'

//Control the open AI recipe. Safety first

export const isValidRecipe = (recipe: any): recipe is TOpenAiRecipe => {
	return (
		typeof recipe.title === 'string' &&
		typeof recipe.description === 'string' &&
		Array.isArray(recipe.ingredients) &&
		recipe.ingredients.every((i: any) => typeof i === 'string') &&
		typeof recipe.time === 'string' &&
		Array.isArray(recipe.instructions) &&
		recipe.instructions.every((i: any) => typeof i === 'string')
	)
}
