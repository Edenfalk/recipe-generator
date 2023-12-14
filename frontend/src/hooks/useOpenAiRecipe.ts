import { getOpenAiRecipe } from '@/service/OpenAIAPI'
import { useQuery } from '@tanstack/react-query'

const useOpenAiRecipe = (
	ingredients: string[],
	time: string,
	servings: string
) => {
	return useQuery({
		queryKey: ['Ai Recipe'],
		queryFn: () => getOpenAiRecipe(ingredients, time, servings),
	})
}

export default useOpenAiRecipe
