import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'
import { Card } from './ui/card'

const LoginBox = () => {
	const { loginWithRedirect } = useAuth0()
	return (
		<div className='flex justify-center items-center'>
			<Card className='max-w-md p-10 mt-20 mx-2'>
				<h1 className='text-xl text-center'>
					You need to log in to visit this page
				</h1>
				<Button
					size='lg'
					onClick={() => loginWithRedirect()}
					className='w-full mt-4'
				>
					Login / Register
				</Button>
			</Card>
		</div>
	)
}

export default LoginBox
