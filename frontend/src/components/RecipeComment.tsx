import { TComment } from '@/types/Comments.types'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, ThumbsUp, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import useDeleteComment from '@/hooks/useDeleteComment'
import useToggleLikeComment from '@/hooks/useToggleLikeComment'
import useCheckIfUserLikedComment from '@/hooks/useCheckIfUserLikedComment'
import { toast } from './ui/use-toast'

interface CommentProps {
	comment: TComment
}

const RecipeComment: React.FC<CommentProps> = ({ comment }) => {
	const { user } = useAuth0()
	const { mutate: deleteComment } = useDeleteComment()
	const { mutate: toggleLike, isPending } = useToggleLikeComment()
	const { data: likeStatus } = useCheckIfUserLikedComment(comment.id)
	const [isLikedByUser, setIsLikedByUser] = useState(false)

	useEffect(() => {
		if (likeStatus) {
			setIsLikedByUser(likeStatus.likedByUser)
		}
	}, [likeStatus])

	const handleLikeClick = () => {
		if (user) {
			toggleLike({ commentId: comment.id, recipeId: comment.recipeId })
		} else {
			toast({
				description: 'You need to log in to like comments',
			})
		}
	}
	return (
		<>
			<div
				key={comment.id}
				className='border-b last:border-b-0 py-4 relative'
			>
				<div className='flex justify-between items-start'>
					<div className='flex items-center mb-2'>
						<img
							src={comment.author.picture}
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
				<div className='mt-2'>
					<Button
						variant='outline'
						onClick={handleLikeClick}
						disabled={isPending}
					>
						<span className='flex items-center'>
							<ThumbsUp
								className={`h-5 w-5 ${
									isLikedByUser
										? 'text-blue-500'
										: 'text-gray-500'
								}`}
							/>
							<span className='ml-2'>{comment._count.likes}</span>
						</span>
					</Button>
				</div>
			</div>
		</>
	)
}

export default RecipeComment
