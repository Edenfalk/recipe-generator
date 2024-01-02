import { TComment } from './Comments.types'
import { TUser } from './User.types'

export type TLike = {
	id: string
	comment: TComment
	commentId: string
	user: TUser
	userId: string
	createdAt: string
}
