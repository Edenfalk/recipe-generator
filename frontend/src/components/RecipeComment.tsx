import { TComment } from '@/types/Comments.types'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import useDeleteComment from '@/hooks/useDeleteComment'

interface CommentProps {
	comment: TComment
}

const RecipeComment: React.FC<CommentProps> = ({ comment }) => {
	const { user } = useAuth0()
	const { mutate: deleteComment } = useDeleteComment()
	return (
		<>
			<div
				key={comment.id}
				className='border-b last:border-b-0 py-4 relative'
			>
				<div className='flex justify-between items-start'>
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
								{new Date(comment.createdAt).toLocaleString()}
							</p>
						</div>
					</div>
					{comment.authorId === user?.sub && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost'>
									<MoreHorizontal />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className='absolute right-0 w-16'
								align='end'
							>
								<DropdownMenuGroup>
									<DropdownMenuItem
										className='flex justify-between cursor-pointer text-red-600'
										onClick={() =>
											deleteComment(comment.id)
										}
									>
										<span>Delete</span>
										<Trash className='h-4 w-4' />
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
				<p>{comment.content}</p>
			</div>
		</>
	)
}

export default RecipeComment
