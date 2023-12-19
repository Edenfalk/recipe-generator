import { useAuth0 } from '@auth0/auth0-react'
import { useIsFetching } from '@tanstack/react-query'
import { BarLoader } from 'react-spinners'

const LoadingSpinner = () => {
	const isFetching = useIsFetching()
	const { isLoading } = useAuth0()
	return isFetching || isLoading ? (
		<div className='flex items-center justify-center h-screen'>
			<BarLoader width={250} />
		</div>
	) : null
}

export default LoadingSpinner
