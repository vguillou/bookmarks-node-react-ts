import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { notFound } from '@hapi/boom'
import { envConfig, serverConfig } from './config'
import mainRouter from './routes'
import errorMiddlewares from './middlewares/error'
import logger from './logger'

const app = express()

// request logging
app.use(
    morgan(envConfig.production ? 'combined' : 'dev', {
        stream: {
            write: (msg): unknown => logger.info(msg), // stream morgan logs to winston
        },
    })
)

// parse request body as JSON by default
app.use(express.json())

// secure api by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
if (serverConfig.useCors) app.use(cors())

// Mount the main router
app.use(`/`, mainRouter)

// Forward a 404 to the error middleware for any route not matched by the mainRouter
app.use((_req, _res, next) => next(notFound('Unknown operation')))

// error middlewares
app.use(...errorMiddlewares)

export default app
