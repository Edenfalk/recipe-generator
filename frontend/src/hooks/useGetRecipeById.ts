import { getRecipeById } from '@/service/RecipeGeneratorAPI'
import { useQuery } from '@tanstack/react-query'

const useGetRecipesById = (id: string) => {
	return useQuery({
		queryKey: ['Single Recipe', id],
		queryFn: async () => {
			return getRecipeById(id)
		},
	})
}

export default useGetRecipesById
