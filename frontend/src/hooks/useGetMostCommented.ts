import { getTenMostCommentedRecipes } from '@/service/RecipeGeneratorAPI'
import { useQuery } from '@tanstack/react-query'

const useGetMostCommented = () => {
	return useQuery({
		queryKey: ['Most Commented'],
		queryFn: async () => {
			return getTenMostCommentedRecipes()
		},
	})
}

export default useGetMostCommented
