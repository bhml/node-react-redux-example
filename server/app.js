import path from 'path'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import initdb from './initdb'
import api from './api'
import assetsMiddleware from './middlewares/assets'

const app = express()

const ip = process.env.IP || '127.0.0.1'
const port = parseInt(process.env.PORT, 10) || 3000
const env = process.env.NODE_ENV || 'development'
const testEnv = env === 'testing'

// server logging
if (!testEnv) app.use(morgan('dev'))

// secure HTTP headers
app.use(helmet({ hsts: false }))
app.use(cors())

// parse request bodies into req.body and catch invalid JSON requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((error, req, res, next) => {
  if (error && error instanceof SyntaxError) {
    res.status(400).send('Error: Invalid JSON')
  }
  else {
    next()
  }
})

// reserve /public to static files
app.use('/public', express.static(path.join(__dirname, '../public')))

// initialize data and make it available to the API
initdb((db) => {
  // primary API endpoint (ie. you can change this to: '/api')
  // this takes priority before the client routes
  app.use('/', api(db))

  // manage client assets and webpack dev server
  assetsMiddleware(app)

  if (!testEnv) {
    app.listen(port)
    console.log(`Starting the ${env} server ${ip} listening on port ${port}`)
  }
})

if (!testEnv) {
  // graceful shutdown on termination signals
  const terminate = () => {
    console.log(`Server stopping on port ${port}`)
    process.exit(0)
  }

  process.on('SIGUSR2', terminate)
  process.on('SIGINT', terminate)
  process.on('SIGTERM', terminate)
}

export default app
