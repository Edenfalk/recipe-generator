import useOpenAiRecipe from '@/hooks/useOpenAiRecipe'

const HomePage = () => {
	const ingredients = ['potatoes', 'bacon', 'all spice', 'onions']
	const time = '30'
	const servings = '4'

	const { data } = useOpenAiRecipe(ingredients, time, servings)

	console.log('data from HP', data)

	return <div></div>
}

export default HomePage
