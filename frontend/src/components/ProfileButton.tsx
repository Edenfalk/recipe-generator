import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth0 } from '@auth0/auth0-react'

const ProfileButton = () => {
	const { logout, user } = useAuth0()

	const handleLogout = () => {
		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		})
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user?.picture} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='cursor-pointer'>
					Profile
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='cursor-pointer'
					onClick={handleLogout}
				>
					Log Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ProfileButton
