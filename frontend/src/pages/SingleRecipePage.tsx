import SingleRecipeComponent from '@/components/SingleRecipeComponent'
import { useParams } from 'react-router'

const SingleRecipePage = () => {
	const { id } = useParams()
	if (!id) {
		return <p>No Recipe found sry</p>
	}
	return (
		<>
			<SingleRecipeComponent id={id} />
		</>
	)
}

export default SingleRecipePage
