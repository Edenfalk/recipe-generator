import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const useAccessToken = () => {
	const { getAccessTokenSilently } = useAuth0()
	const [accessToken, setAccessToken] = useState<string | null>(null)

	useEffect(() => {
		const fetchToken = async () => {
			const token = await getAccessTokenSilently()
			setAccessToken(token)
		}

		fetchToken()
	}, [getAccessTokenSilently])

	return accessToken
}

export default useAccessToken
