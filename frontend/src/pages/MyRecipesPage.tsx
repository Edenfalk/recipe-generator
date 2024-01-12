import RecipeCard from '@/components/RecipeCard'
import useGetRecipesByUser from '@/hooks/useGetRecipesByUser'

const MyRecipesPage = () => {
	const myRecipes = useGetRecipesByUser()
	console.log(myRecipes.data)
	return (
		<>
			<h1 className='text-center text-xl'>My created recipes</h1>
			{myRecipes.data && <RecipeCard recipes={myRecipes.data} />}
		</>
	)
}

export default MyRecipesPage
