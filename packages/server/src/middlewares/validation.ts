import { Request, Response, NextFunction, RequestHandler } from 'express'
import { Schema } from '@hapi/joi'
import Boom from '@hapi/boom'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ValidatedRequest extends Request {
    validated: {
        params: any
        query: any
        body: any
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function getValidatedObject<T>(objectToValidate: T, schema?: Schema): T {
    if (schema) {
        const { error, value } = schema.validate(objectToValidate)
        if (error) throw error
        return value
    }
    return objectToValidate
}

/**
 * Validate a request. Id valid, attach a `validated` property to the request with the validated params, query and body.
 * Otherwise, forwards it to the error middleware.
 */
function validateRequest(validationSchema: {
    params?: Schema
    query?: Schema
    body?: Schema
}): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const validatedRequest = req as ValidatedRequest
        try {
            validatedRequest.validated = {
                params: getValidatedObject(req.params, validationSchema.params),
                query: getValidatedObject(req.query, validationSchema.query),
                body: getValidatedObject(req.body, validationSchema.body),
            }
        } catch (e) {
            return next(Boom.badRequest('Validation Error', e))
        }
        next()
    }
}
export { validateRequest }
