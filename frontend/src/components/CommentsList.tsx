import useGetRecipesById from '@/hooks/useGetRecipeById'
import React from 'react'

interface RecipeProps {
	id: string
}

const CommentsList: React.FC<RecipeProps> = ({ id }) => {
	const { data: recipe } = useGetRecipesById(id)
	if (!recipe) {
		return
	}
	return (
		<div className='mx-auto max-w-7xl p-8'>
			{recipe.comments.map((comment) => {
				return (
					<div
						key={comment.id}
						className='border-b last:border-b-0 py-4'
					>
						<div className='flex items-center mb-2'>
							<img
								src='https://s.gravatar.com/avatar/2f5a988e4a76b72e548d20625cd8354a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fme.png'
								alt='User profile'
								className='w-10 h-10 rounded-full mr-3'
							/>
							<div>
								<p className='font-semibold'>
									{comment.author.nickname}
								</p>
								<p className='text-sm italic'>
									{new Date(
										comment.createdAt
									).toLocaleString()}
								</p>
							</div>
						</div>
						<p>{comment.content}</p>
					</div>
				)
			})}
		</div>
	)
}

export default CommentsList
