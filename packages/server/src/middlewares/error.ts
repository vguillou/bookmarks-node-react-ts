// Disabled no-unused-vars because all express error middleware MUST have 4 parameters
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express'
import logger from '../logger'
import { Boom, isBoom, boomify } from '@hapi/boom'

/**
 * Transform any error to a standard error
 */
function standardizeError(err: Error, _req: Request, _res: Response, next: NextFunction): void {
    if (isBoom(err)) return next(err)
    next(boomify(err, { message: 'Unhandled error' }))
}

/**
 * Log standard error
 */
function logStandardError(boom: Boom, _req: Request, _res: Response, next: NextFunction): void {
    if (boom.output.statusCode >= 500) logger.error(boom.output.payload?.message, boom)
    else logger.debug(boom.output.payload?.message)
    next(boom)
}

/**
 * Error middleware
 */
function respondWithStandardError(
    boom: Boom,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    res.status(boom.output.statusCode).json({
        ...boom.output.payload,
        ...(boom.data && boom.data.message ? { message: boom.data.message } : {}),
    })
}

export default [standardizeError, logStandardError, respondWithStandardError]
