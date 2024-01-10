import { getRecentlyAddedRecipes } from '@/service/RecipeGeneratorAPI'
import { useQuery } from '@tanstack/react-query'

const useGetRecentlyAddedRecipes = () => {
	return useQuery({
		queryKey: ['Recently Added'],
		queryFn: async () => {
			return getRecentlyAddedRecipes()
		},
	})
}

export default useGetRecentlyAddedRecipes
