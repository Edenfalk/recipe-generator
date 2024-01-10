import { getTenMostRatedRecipes } from '@/service/RecipeGeneratorAPI'
import { useQuery } from '@tanstack/react-query'

const useGetMostRated = () => {
	return useQuery({
		queryKey: ['Most Rated'],
		queryFn: async () => {
			return getTenMostRatedRecipes()
		},
	})
}

export default useGetMostRated
