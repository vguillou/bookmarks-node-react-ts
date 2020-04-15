import { Server } from 'http'
import startup from './startup'
import shutdown from './shutdown'
import logger from './logger'

let server: Server

// Prepare Error Handlers
function errorHandlerFn(errorType: string) {
    return (error: unknown | undefined): void => {
        logger.error(errorType, error)
        shutdown(server)
    }
}
process
    .on('uncaughtException', errorHandlerFn('uncaughtException'))
    .on('unhandledRejection', errorHandlerFn('unhandledRejection'))

// Prepare Shutdown Handlers
process
    .on('SIGTERM', () => shutdown(server))
    .on('SIGINT', () => shutdown(server))
    .on('message', (msg) => {
        if (msg === 'shutdown') shutdown(server)
    })

// Start the App
startup().then((startedServer) => {
    server = startedServer
})
