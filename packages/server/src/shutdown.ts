import { Server } from 'http'
import logger from './logger'

const shutdownLogPrefix = '[SHUTDOWN]'

function shutdown(server?: Server): void {
    // Stop the server from accepting new connections and finishes existing connections
    if (!server) {
        logger.info(`${shutdownLogPrefix} No HTTP server started`)
        process.exit(0)
    }

    logger.info(`${shutdownLogPrefix} Closing HTTP server...`)
    server.close(async (err) => {
        if (err) {
            logger.error(`${shutdownLogPrefix} Closing HTTP server: error`, err)
            process.exit(1)
        }
        logger.info(`${shutdownLogPrefix}Closing HTTP server: done!`)
        process.exit(0)
    })
}

export default shutdown
