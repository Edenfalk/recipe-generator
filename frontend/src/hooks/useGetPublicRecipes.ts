import { getAllPublicRecipes } from '@/service/RecipeGeneratorAPI'
import { useQuery } from '@tanstack/react-query'

const useGetPublicRecipes = () => {
	return useQuery({
		queryKey: ['Public Recipes'],
		queryFn: async () => {
			return getAllPublicRecipes()
		},
	})
}

export default useGetPublicRecipes
