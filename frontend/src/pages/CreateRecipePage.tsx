import GenerateRecipeForm from '@/components/GenerateRecipeForm'
import RecipeDisplay from '@/components/RecipeDisplay'
import useOpenAiRecipe from '@/hooks/useOpenAiRecipe'
import { TCreateRecipeSchema } from '@/zod/ZRecipeSchema'
import { useState } from 'react'

const CreateRecipePage = () => {
	const [recipeData, setRecipeData] = useState<TCreateRecipeSchema | null>(
		null
	)
	const [isQueryEnabled, setIsQueryEnabled] = useState(false)
	const handleNewRecipeClick = () => {
		setRecipeData(null)
		setIsQueryEnabled(false)
	}

	const recipeQueryResult = useOpenAiRecipe(
		recipeData?.ingredients || [],
		recipeData?.time || '',
		recipeData?.servings || '',
		isQueryEnabled
	)
	const handleRecipeSubmit = (formData: TCreateRecipeSchema) => {
		setRecipeData(formData)
		setIsQueryEnabled(true)
	}

	return recipeQueryResult.data ? (
		<RecipeDisplay
			recipe={recipeQueryResult.data}
			onNewRecipe={handleNewRecipeClick}
		/>
	) : (
		!recipeQueryResult.isLoading && (
			<GenerateRecipeForm onRecipeSubmit={handleRecipeSubmit} />
		)
	)
}

export default CreateRecipePage
