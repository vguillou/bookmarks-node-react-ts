import { RequestHandler } from 'express'
import Boom from '@hapi/boom'

/**
 * Encapsulate a request handler function, catching any error occurring during its execution
 * and forwarding it to the configured error middleware
 * @param requestHandler Request handler function
 * @returns The wrapped request handler
 */
function catchRequestHandlerError(requestHandler: RequestHandler): RequestHandler {
    return async (req, res, next): Promise<void> => {
        try {
            await requestHandler(req, res, next)
        } catch (e) {
            next(Boom.boomify(e, { message: 'Unhandled RequestHandler error' }))
        }
    }
}

export { catchRequestHandlerError }
