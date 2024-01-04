import { getAllPublicRecipes } from '@/service/RecipeGeneratorAPI'
import { useQuery } from '@tanstack/react-query'

const useGetRecipesById = () => {
	return useQuery({
		queryKey: ['Public Recipes'],
		queryFn: async () => {
			return getAllPublicRecipes()
		},
	})
}

export default useGetRecipesById
