import { getRecipeById } from '@/service/RecipeGeneratorAPI'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'

const useGetRecipesById = (id: string) => {
	const { getAccessTokenSilently } = useAuth0()

	return useQuery({
		queryKey: ['Single Recipe', id],
		queryFn: async () => {
			const token = await getAccessTokenSilently()
			return getRecipeById(token, id)
		},
	})
}

export default useGetRecipesById
