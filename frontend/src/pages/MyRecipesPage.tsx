import RecipeCard from '@/components/RecipeCard'
import useGetRecipesByUser from '@/hooks/useGetRecipesByUser'

const MyRecipesPage = () => {
	const myRecipes = useGetRecipesByUser()
	console.log(myRecipes.data)
	return <>{myRecipes.data && <RecipeCard recipes={myRecipes.data} />}</>
}

export default MyRecipesPage
