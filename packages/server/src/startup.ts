import { Server } from 'http'
import app from './express.app'
import { envConfig, serverConfig } from './config'
import logger from './logger'

const startupLogPrefix = '[STARTUP]'
const { appName, appVersion, host, port, serveSwaggerUI } = serverConfig

async function startup(): Promise<Server> {
    // Start the express app
    logger.info(`${startupLogPrefix} Starting HTTP server...`)

    return new Promise((resolve) => {
        const server = app.listen(port, () => {
            logger.info(
                `${startupLogPrefix} '${appName}' ${appVersion} is running in ${
                    envConfig.production ? 'prod' : 'dev'
                } mode`
            )
            logger.info(`${startupLogPrefix} → Server started at http://${host}:${port}`)

            if (serveSwaggerUI) logger.info(`→ Swagger UI at http://${host}:${port}/api-docs`)

            if (typeof process.send === 'function') process.send('ready') // Signal to the process manager in use (ex: pm2) that the app is ready

            resolve(server)
        })
    })
}

export default startup
