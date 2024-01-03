import { getCommentsForRecipe } from '@/service/RecipeGeneratorAPI'
import { useQuery } from '@tanstack/react-query'
import { TComment } from '@/types/Comments.types'

const useGetCommentsForRecipe = (recipeId: string) => {
	return useQuery<TComment[], Error>({
		queryKey: ['comments', recipeId],
		queryFn: async () => {
			return getCommentsForRecipe(recipeId)
		},
		enabled: !!recipeId,
	})
}

export default useGetCommentsForRecipe
