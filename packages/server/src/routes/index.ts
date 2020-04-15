import express, { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../../docs/openapi.json'
import bookmarkRouter from './bookmarks'
import healthcheckRouter from './healthcheck'
import { serverConfig, envConfig } from '../config'

const mainRouter = Router()

mainRouter.use('/healthcheck', healthcheckRouter)

mainRouter.use('/api/bookmarks', bookmarkRouter)

// Serve Swagger UI
if (serverConfig.serveSwaggerUI) {
    mainRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

// Serve Front-End
if (serverConfig.frontEndDir) {
    if (envConfig.production) {
        mainRouter.use(express.static(serverConfig.frontEndDir))
        mainRouter.get('*', (_req, res) => {
            res.sendFile('index.html', { root: serverConfig.frontEndDir })
        })
    } else {
        mainRouter.get('*', (_req, res) =>
            res.send(
                `<h1>No Front End here in Development mode!</h1>
                <p>Open <a href='http://localhost:3000/'>http://localhost:3000/</a></p>`
            )
        )
    }
}

export default mainRouter
