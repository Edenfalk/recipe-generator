import { getRecipesByUser } from '@/service/RecipeGeneratorAPI'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'

const useGetRecipesByUser = () => {
	const { getAccessTokenSilently } = useAuth0()

	return useQuery({
		queryKey: ['User Recipe'],
		queryFn: async () => {
			const token = await getAccessTokenSilently()
			return getRecipesByUser(token)
		},
	})
}

export default useGetRecipesByUser
