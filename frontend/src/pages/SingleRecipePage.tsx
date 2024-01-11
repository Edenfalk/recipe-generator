import CommentsList from '@/components/CommentsList'
import PostComment from '@/components/PostComments'
import SingleRecipeComponent from '@/components/SingleRecipeComponent'
import { Card } from '@/components/ui/card'
import useGetRecipesById from '@/hooks/useGetRecipeById'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router'

const SingleRecipePage = () => {
	const { id } = useParams()
	const { user } = useAuth0()
	const { data: recipe, isError } = useGetRecipesById(id!)
	if (!recipe || isError) {
		return (
			<div className='flex justify-center items-center'>
				<Card className='max-w-lg p-10 mt-20 mx-2'>
					<h1 className='text-xl'>Ooops!</h1>
					<p className='font-medium mt-2'>Something went wrong.</p>
				</Card>
			</div>
		)
	}
	if (!recipe.isPublic && recipe.authorId !== user?.sub) {
		return (
			<div className='flex justify-center items-center'>
				<Card className='max-w-md p-10 mt-20 mx-2'>
					<h1 className='text-xl'>Ooops!</h1>
					<p className='font-medium mt-2'>
						Something went wrong. This recipe might either not
						belong to you, or the creator has not made it public
						yet.
					</p>
				</Card>
			</div>
		)
	}
	return (
		<>
			<SingleRecipeComponent recipe={recipe} />
			<CommentsList recipe={recipe} />
			<PostComment recipe={recipe} />
		</>
	)
}

export default SingleRecipePage
