import { Request, Response, NextFunction } from 'express'
import Boom from '@hapi/boom'
import Joi from '@hapi/joi'
import { Bookmark } from '@vguillou/bookmarks-common/lib/entities/Bookmark'
import { ValidatedRequest } from '../../middlewares/validation'
import ApiResponse from '../../entities/ApiResponse'
import { getBookmark, updateBookmark } from '../../models/bookmark.model'
import logger from '../../logger'

/**
 * Put an existing bookmark request handler
 * @param req Request
 * @param res Response
 * @param next Next function, to forward to the next handler/middleware
 */
export async function putBookmarkRequestHandler(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<unknown> {
    const bookmarkToAddOrUpdate = (req as ValidatedRequest).validated.body as Bookmark

    if (await getBookmark(bookmarkToAddOrUpdate.id)) {
        const bookmarkUpdated = await updateBookmark(bookmarkToAddOrUpdate)
        if (!bookmarkUpdated)
            return next(Boom.badImplementation('Failed to update bookmark', bookmarkToAddOrUpdate))
        logger.debug('Updated bookmark', bookmarkToAddOrUpdate)

        const apiResponse = new ApiResponse(200, bookmarkToAddOrUpdate)
        return res.status(apiResponse.statusCode).json(apiResponse)
    }

    return next(Boom.notFound(`Bookmark ${bookmarkToAddOrUpdate.id} not found`))
}

/**
 * Validation schemas
 */
export const putBookmarkFromURLValidationSchemas = {
    body: Joi.object().keys({
        id: Joi.number().min(0).required(),
        url: Joi.string().uri().trim().required(),
        title: Joi.string().trim().optional(),
        author: Joi.string().trim().optional(),
        thumbnailUrl: Joi.string().uri().trim().optional(),
        providerName: Joi.string().trim().optional(),
        createdAt: Joi.date().iso().required(),
        tags: Joi.array().items(Joi.string().trim()).optional(),
        media: [
            Joi.object().keys({
                width: Joi.number().min(0).required(),
                height: Joi.number().min(0).required(),
            }),
            Joi.object().keys({
                html: Joi.string().trim().required(),
                width: Joi.number().min(0).required(),
                height: Joi.number().min(0).required(),
                length: Joi.number().min(0).optional(),
            }),
        ],
    }),
}
