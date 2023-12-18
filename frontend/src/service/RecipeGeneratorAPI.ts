import { TNewUser, TUser } from '@/types/User.types'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const recipeGenerator = axios.create({
	baseURL: BASE_URL,
	timeout: 3000,
})

export const createUser = async (user: TNewUser, token: string) => {
	const response = await recipeGenerator.post<TUser>('api/users', user, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}
