import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 5, // 5min
			gcTime: 1000 * 60 * 60, // 1 h
		},
	},
})

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Auth0Provider
				domain={domain}
				clientId={clientId}
				authorizationParams={{
					redirect_uri: window.location.origin,
				}}
			>
				<BrowserRouter>
					<ThemeProvider
						defaultTheme='dark'
						storageKey='vite-ui-theme'
					>
						<App />
					</ThemeProvider>
				</BrowserRouter>
			</Auth0Provider>
			<ReactQueryDevtools initialIsOpen={false} position='right' />
		</QueryClientProvider>
	</React.StrictMode>
)
