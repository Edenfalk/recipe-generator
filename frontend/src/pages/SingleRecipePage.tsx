import CommentsList from '@/components/CommentsList'
import PostComment from '@/components/PostComments'
import SingleRecipeComponent from '@/components/SingleRecipeComponent'
import { useParams } from 'react-router'

const SingleRecipePage = () => {
	const { id } = useParams()
	if (!id) {
		return <p>No Recipe found sry</p>
	}
	return (
		<>
			{/* gör hämtningen här inne och skicka hela receptet till single och comments till comments */}
			<SingleRecipeComponent id={id} />
			<CommentsList id={id} />
			<PostComment id={id} />
		</>
	)
}

export default SingleRecipePage
