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
				content: `You are a helpful recipe creator. Create a recipe based of ${ingredients} that can be made in ${time} minutes for ${servings} persons. Name the recipe, give a short description, list the ingredients and a numbered step by step instructions guide. Use the metric system. Respond with a JSON object with this structure: {
                            "title": "string"
                            "description": "string",
                            "servings": "string",
                            "ingredients": "string[]"
                            "time": "string",
                            "instructions": "string[]",
                    } `,
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
