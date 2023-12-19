import { getOpenAiRecipe } from '@/service/OpenAIAPI'
import { useQuery } from '@tanstack/react-query'

const useOpenAiRecipe = (
	ingredients: string[],
	time: string,
	servings: string,
	isQueryEnabled: boolean
) => {
	return useQuery({
		queryKey: ['Ai Recipe', ingredients],
		queryFn: () => getOpenAiRecipe(time, servings, ingredients),
		enabled: isQueryEnabled,
	})
}

export default useOpenAiRecipe
