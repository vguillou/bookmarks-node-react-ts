import { Request, Response } from 'express'
import Joi from '@hapi/joi'
import { ValidatedRequest } from '../../middlewares/validation'
import ApiResponse from '../../entities/ApiResponse'
import { deleteBookmark } from '../../models/bookmark.model'
import logger from '../../logger'

/**
 * Delete a bookmark by id request handler
 * @param req Request
 * @param res Response
 */
export async function deleteBookmarkByIdRequestHandler(
    req: Request,
    res: Response
): Promise<unknown> {
    const id = (req as ValidatedRequest).validated.params.id

    const bookmarkDeleted = await deleteBookmark(id)
    logger.debug(`Bookmark ${id}${bookmarkDeleted ? '' : ' was already'} deleted`)

    const apiResponse = new ApiResponse(204)
    return res.status(apiResponse.statusCode).json(apiResponse)
}

/**
 * Validation schemas
 */
export const deleteBookmarkByIdValidationSchemas = {
    params: Joi.object().keys({
        id: Joi.number().min(0).required(),
    }),
}
