import { URL } from 'url'
import { Request, Response, NextFunction } from 'express'
import { AxiosInstance } from 'axios'
import Boom from '@hapi/boom'
import Joi from '@hapi/joi'
import { createBookmarkFromOEmbed } from '@vguillou/bookmarks-common/lib/entities/Bookmark'
import { ValidatedRequest } from '../../middlewares/validation'
import ApiResponse from '../../entities/ApiResponse'
import { addBookmark } from '../../models/bookmark.model'
import { getOEmbed } from '../../resources/oembed.api-client'
import flickrApi from '../../resources/flickr.api'
import vimeoApi from '../../resources/vimeo.api'
import logger from '../../logger'

/**
 * Get the HTTP Api of the platform to which a given URL belongs to
 * @param url the URL of the resource
 * @returns the Api instance
 * @throws Error
 */
function getApiFromURL(url: URL): AxiosInstance {
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error(`Unsupported protocol '${url.protocol}'`)
    }
    const hostname = url.hostname?.startsWith('www.') ? url.hostname.substring(4) : url.hostname
    switch (hostname) {
        case 'flickr.com':
            return flickrApi
        case 'vimeo.com':
            return vimeoApi
        default:
            throw new Error(`Unsupported URL '${url.toString()}'`)
    }
}

/**
 * Post a new bookmark built from a given URL request handler
 * @param req Request
 * @param res Response
 * @param next Next function, to forward to the next handler/middleware
 */
export async function postBookmarkFromURLRequestHandler(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<unknown> {
    const { url, tags } = (req as ValidatedRequest).validated.body

    // Fetching the bookmark information
    const resourcedURL = new URL(url)
    let api
    let oEmbed
    try {
        api = getApiFromURL(resourcedURL)
    } catch (e) {
        return next(Boom.badRequest(e.message))
    }
    try {
        oEmbed = await getOEmbed(api, { url })
    } catch (e) {
        if (e.response?.status === 404) {
            return next(Boom.notFound(`Media '${url}' not found`))
        }
        return next(Boom.badImplementation(`Cannot bookmark '${url}'`))
    }
    logger.debug(`Fetched oEmbed`, oEmbed)

    // Creating the bookmark
    let bookmark = createBookmarkFromOEmbed(oEmbed, tags)
    const id = await addBookmark(bookmark)
    if (id === undefined) return next(Boom.conflict(`Bookmark '${url}' already exists`))
    bookmark = { ...bookmark, id }
    logger.debug(`Added bookmark`, bookmark)

    const apiResponse = new ApiResponse(201, bookmark)
    return res.status(apiResponse.statusCode).json(apiResponse)
}

/**
 * Validation schemas
 */
export const postBookmarkFromURLValidationSchemas = {
    body: Joi.object().keys({
        url: Joi.string().uri().trim().required(),
        tags: Joi.array().items(Joi.string().trim()).optional(),
    }),
}
