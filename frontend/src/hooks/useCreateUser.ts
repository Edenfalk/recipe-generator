import { useMutation } from '@tanstack/react-query'
import { createUser } from '@/service/RecipeGeneratorAPI'
import { useAuth0 } from '@auth0/auth0-react'

export const useCreateUser = () => {
	const { getAccessTokenSilently } = useAuth0()

	return useMutation({
		mutationFn: async () => {
			const token = await getAccessTokenSilently()
			return createUser(token)
		},
	})
}
