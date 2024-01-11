import app from './server'
import * as doteenv from 'dotenv'
import config from './config'
doteenv.config()

app.listen(config.port, () => {
	console.log(`hello on http://localhost:${config.port}`)
})
