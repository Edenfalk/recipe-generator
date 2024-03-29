import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { TCreateCommentSchema, ZCommentSchema } from '@/zod/ZCommentSchema'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { useAuth0 } from '@auth0/auth0-react'
import { TCreateComment } from '@/types/Comments.types'
import useCreateComment from '@/hooks/useCreateComment'
import { BeatLoader } from 'react-spinners'
import { TRecipe } from '@/types/Recipe.types'

interface RecipeProps {
	recipe: TRecipe
}

const PostComment: React.FC<RecipeProps> = ({ recipe }) => {
	const { user, loginWithRedirect } = useAuth0()
	const { mutate: postComment, isPending } = useCreateComment()
	const form = useForm<TCreateCommentSchema>({
		resolver: zodResolver(ZCommentSchema),
		defaultValues: {
			comment: '',
		},
	})
	const handleSubmit = async (data: TCreateCommentSchema) => {
		const newComment: TCreateComment = {
			recipeId: recipe.id,
			content: data.comment.trim(),
		}
		postComment(newComment)
		form.setValue('comment', '')
	}

	if (!user) {
		return (
			<div className='flex mx-auto p-8 max-w-7xl'>
				<div className='flex justify-end'>
					<Button
						onClick={() =>
							loginWithRedirect({
								appState: {
									returnTo: window.location.origin,
								},
							})
						}
					>
						Log in to write a comment
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col space-y-4 p-8 rounded-lg shadow max-w-7xl mx-auto'>
			<div className='flex items-center space-x-4'>
				{user?.picture && (
					<>
						<img
							alt='avatar'
							className='w-10 h-10 rounded-full'
							src={user?.picture}
						/>
						<span className='font-semibold'>{user?.nickname}</span>
					</>
				)}
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className='flex flex-col space-y-4'
				>
					<FormField
						control={form.control}
						name='comment'
						render={({ field }) => {
							return (
								<FormItem>
									<FormControl>
										<Textarea
											{...field}
											placeholder='Add a comment...'
											className='rounded-lg shadow-sm w-full h-24 resize-none py-2'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)
						}}
					/>
					<div className='flex justify-end'>
						<Button type='submit' className='font-bold py-2 px-4'>
							{isPending ? (
								<BeatLoader size={8} className='px-8' />
							) : (
								<>post comment</>
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default PostComment
