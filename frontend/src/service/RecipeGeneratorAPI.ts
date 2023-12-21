import { TOpenAiRecipe, TRecipe } from '@/types/Recipe.types'
import { TNewUser, TUser } from '@/types/User.types'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const recipeGenerator = axios.create({
	baseURL: BASE_URL,
})

export const createUser = async (user: TNewUser, token: string) => {
	const response = await recipeGenerator.post<TUser>('/users', user, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}

export const createRecipe = async (recipe: TOpenAiRecipe, token: string) => {
	const response = await recipeGenerator.post<TRecipe>('/recipes', recipe, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	console.log(response.data)
	return response.data
}

export const getRecipesByUser = async (token: string) => {
	const response = await recipeGenerator.get<TRecipe[]>(
		'/recipes/myrecipes',
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)
	console.log(response.data)
	return response.data
}
