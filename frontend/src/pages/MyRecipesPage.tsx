import RecipeCard from '@/components/RecipeCard'
import useGetRecipesByUser from '@/hooks/useGetRecipesByUser'

const MyRecipesPage = () => {
	const myRecipes = useGetRecipesByUser()
	return (
		<>
			<h1 className='text-xl text-center font-bold mt-5'>
				My created recipes
			</h1>
			{myRecipes.data && <RecipeCard recipes={myRecipes.data} />}
		</>
	)
}

export default MyRecipesPage
