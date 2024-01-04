import { TComment, TCreateComment } from '@/types/Comments.types'
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
	return response.data
}

export const getRecipeById = async (token: string, id: string) => {
	const response = await recipeGenerator.get<TRecipe>(`recipes/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}

export const makeRecipePublic = async (token: string, id: string) => {
	const response = await recipeGenerator.patch<TRecipe>(
		`recipes/${id}`,
		{
			isPublic: true,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)
	return response.data
}

export const createComment = async (token: string, comment: TCreateComment) => {
	const response = await recipeGenerator.post<TComment>(
		'/comments',
		comment,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)
	return response.data
}

export const deleteComment = async (token: string, commentId: string) => {
	const response = await recipeGenerator.delete<TComment>(
		`/comments/${commentId}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)
	return response.data
}

export const getCommentsForRecipe = async (recipeId: string) => {
	const response = await recipeGenerator.get<TComment[]>(
		`/comments/recipe/${recipeId}`
	)
	console.log(response.data)
	return response.data
}

export const likeComment = async (token: string, commentId: string) => {
	const response = await recipeGenerator.post(
		`/comments/${commentId}/like`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)
	console.log(response.data)
	return response.data
}

export const checkIfUserLikedComment = async (
	token: string,
	commentId: string
) => {
	const response = await recipeGenerator.get<{ likedByUser: boolean }>(
		`/comments/${commentId}/likedByUser`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)
	console.log('Like status:', response.data)
	return response.data
}
