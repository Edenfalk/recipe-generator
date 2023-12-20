import { useMutation } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { createRecipe } from '@/service/RecipeGeneratorAPI'
import { TOpenAiRecipe, TRecipe } from '@/types/Recipe.types'
import { useToast } from '@/components/ui/use-toast'

export const useCreateRecipe = () => {
	const { getAccessTokenSilently } = useAuth0()
	const { toast } = useToast()

	// First type = return, third type = received

	return useMutation<TRecipe, Error, TOpenAiRecipe>({
		mutationFn: async (recipeData) => {
			const token = await getAccessTokenSilently()
			return createRecipe(recipeData, token)
		},
		onSuccess: (data) => {
			toast({
				title: 'Success',
				description: 'Recipe saved successfully!',
			})
			console.log('Recipe saved!:', data)
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: 'Could not save the recipe. Please try again.',
			})
			console.error('Could not save recipe:', error)
		},
	})
}
