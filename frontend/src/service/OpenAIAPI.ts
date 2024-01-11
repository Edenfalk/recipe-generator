import { isValidRecipe } from '@/helpers/validateAiResponse'
import { TOpenAiRecipe } from '@/types/Recipe.types'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPENAI_KEY,
	dangerouslyAllowBrowser: true,
})

export async function getOpenAiRecipe(
	time: string,
	servings: string,
	ingredients: string[]
): Promise<TOpenAiRecipe> {
	const response = await openai.chat.completions.create({
		messages: [
			{
				role: 'assistant',
				content: `As an AI trained in generating practical and safe food recipes, your task is to create a recipe using these common kitchen ingredients: ${ingredients.join(
					', '
				)}. The recipe should be feasible to prepare in ${time} minutes and suitable for ${servings} persons. Please provide a recipe with a title, a brief description, a list of ingredients, and step-by-step, not numbered, cooking instructions. Ensure all ingredients measurements are provided in metric units. The response should be in JSON format with the following structure:

                {
                  "title": "string",
                  "description": "string",
                  "servings": "string",
                  "ingredients": "string[]",
                  "time": "string",
                  "instructions": "string[]",
                }
                
                If the ingredients provided do not allow for a conventional food recipe, or if they include any non-food items or unsafe combinations, respond with: {"error": "Invalid ingredients provided"}. This is to ensure the recipe is practical, uses ordinary food ingredients, and is safe for general consumption.`,
			},
		],
		model: 'gpt-3.5-turbo-0613',
	})

	try {
		const content = response.choices[0].message.content
		if (content === null) {
			throw new Error('No recipe content received')
		}

		let recipeObj
		try {
			recipeObj = JSON.parse(content)
		} catch (parseError) {
			console.error(
				`Could not create recipe with ${ingredients}:`,
				parseError
			)
			throw new Error('Invalid recipe format')
		}

		// Validate the structure of the response
		if (isValidRecipe(recipeObj)) {
			return recipeObj as TOpenAiRecipe
		} else {
			console.error(`Could not create recipe with ${ingredients}`)
			throw new Error(`Could not create recipe with ${ingredients}`)
		}
	} catch (error) {
		console.error('Error fetching recipe:', error)
		throw error
	}
}
