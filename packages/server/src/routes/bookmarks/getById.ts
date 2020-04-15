import { Request, Response, NextFunction } from 'express'
import Boom from '@hapi/boom'
import Joi from '@hapi/joi'
import { ValidatedRequest } from '../../middlewares/validation'
import ApiResponse from '../../entities/ApiResponse'
import { getBookmark } from '../../models/bookmark.model'
import logger from '../../logger'

/**
 * Get a bookmark by id request handler
 * @param req Request
 * @param res Response
 * @param next Next function, to forward to the next handler/middleware
 */
export async function getBookmarkByIdRequestHandler(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<unknown> {
    const id = (req as ValidatedRequest).validated.params.id

    const bookmark = await getBookmark(id)

    if (!bookmark) return next(Boom.notFound(`Bookmark ${id} not found`))
    logger.debug(`Found Bookmark ${id}`, bookmark)

    const apiResponse = new ApiResponse(200, bookmark)
    return res.status(apiResponse.statusCode).json(apiResponse)
}

/**
 * Validation schemas
 */
export const getBookmarkByIdValidationSchemas = {
    params: Joi.object().keys({
        id: Joi.number().min(0).required(),
    }),
}
