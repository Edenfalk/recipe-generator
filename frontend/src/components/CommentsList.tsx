import React from 'react'
import RecipeComment from './RecipeComment'
import { TRecipe } from '@/types/Recipe.types'

interface RecipeProps {
	recipe: TRecipe
}

const CommentsList: React.FC<RecipeProps> = ({ recipe }) => {
	if (!recipe) {
		return
	}
	return (
		<div className='mx-auto max-w-7xl p-8 pt-0'>
			<h1 className='font-semibold text-xl text-center'>
				Comments ({recipe.comments.length})
			</h1>
			{recipe.comments.map((comment) => (
				<RecipeComment key={comment.id} comment={comment} />
			))}
		</div>
	)
}

export default CommentsList
