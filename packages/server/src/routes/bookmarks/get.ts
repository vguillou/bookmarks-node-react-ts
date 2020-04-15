import { Response, Request } from 'express'
import Joi from '@hapi/joi'
import { ValidatedRequest } from '../../middlewares/validation'
import ApiResponse from '../../entities/ApiResponse'
import { getBookmarks, getBookmarksCount } from '../../models/bookmark.model'
import logger from '../../logger'

/**
 * Get bookmarks request handler
 * @param req Request
 * @param res Response
 */
export async function getBookmarksRequestHandler(req: Request, res: Response): Promise<unknown> {
    let { limit, offset } = (req as ValidatedRequest).validated.query
    limit = limit || Infinity
    offset = offset || 0

    const bookmarks = await getBookmarks(limit, offset)
    logger.debug(`Retrieved ${bookmarks.length} bookmark(s)`)

    const count = await getBookmarksCount()
    logger.debug(`Counted ${count} bookmark(s) in total`)

    let nextURL
    let previousURL
    if (limit && limit < count) {
        if (offset + limit < count)
            nextURL = `${req.baseUrl}?limit=${limit}&offset=${offset + limit}`

        if (offset > 0) previousURL = `${req.baseUrl}?limit=${limit}&offset=${offset - limit}`
    }

    const statusCode = bookmarks.length === count ? 200 : 206

    const apiResponse = new ApiResponse(statusCode, {
        bookmarks,
        count,
        nextURL,
        previousURL,
    })
    return res.status(apiResponse.statusCode).json(apiResponse)
}

/**
 * Validation schemas
 */
export const getBookmarksValidationSchemas = {
    query: Joi.object().keys({
        limit: Joi.number().min(0).optional(),
        offset: Joi.number().min(0).optional(),
    }),
}
