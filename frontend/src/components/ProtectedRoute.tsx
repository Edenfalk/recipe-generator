import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import LoginBox from './LoginBox'

interface IRequireAuthProps {
	children: React.ReactNode
}

const ProtectedRoute: React.FC<IRequireAuthProps> = ({ children }) => {
	const { user } = useAuth0()

	return user ? <>{children}</> : <LoginBox />
}

export default ProtectedRoute
