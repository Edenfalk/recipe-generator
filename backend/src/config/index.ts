import merge from 'lodash.merge'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const stage = process.env.STAGE || 'local'

let envConfig

if (stage === 'production') {
	envConfig = require('./prod').default
} else if (stage === 'testing') {
	envConfig = require('./testing').default
} else {
	envConfig = require('./local').default
}

export default merge(
	{
		stage,
		env: process.env.NODE_ENV,
		port: process.env.PORT,
		secrets: {
			DATABASE_URL: process.env.DATABASE_URL,
			OPENAI_API_KEY: process.env.OPENAI_API_KEY,
			AZURE_STORAGE_CONNECTION_STRING:
				process.env.AZURE_STORAGE_CONNECTION_STRING,
		},
	},
	envConfig
)
