import { Router } from 'express'
import { validateRequest } from '../../middlewares/validation'
import { getBookmarksRequestHandler, getBookmarksValidationSchemas } from './get'
import {
    postBookmarkFromURLRequestHandler,
    postBookmarkFromURLValidationSchemas,
} from './postFromURL'
import { putBookmarkRequestHandler, putBookmarkFromURLValidationSchemas } from './put'
import { getBookmarkByIdRequestHandler, getBookmarkByIdValidationSchemas } from './getById'
import { deleteBookmarkByIdRequestHandler, deleteBookmarkByIdValidationSchemas } from './deleteById'
import { catchRequestHandlerError } from '../../utils/error.utils'

const bookmarkRouter = Router()

bookmarkRouter.get(
    '/',
    validateRequest(getBookmarksValidationSchemas),
    catchRequestHandlerError(getBookmarksRequestHandler)
)
bookmarkRouter.post(
    '/',
    validateRequest(postBookmarkFromURLValidationSchemas),
    catchRequestHandlerError(postBookmarkFromURLRequestHandler)
)
bookmarkRouter.put(
    '/',
    validateRequest(putBookmarkFromURLValidationSchemas),
    catchRequestHandlerError(putBookmarkRequestHandler)
)
bookmarkRouter.get(
    '/:id',
    validateRequest(getBookmarkByIdValidationSchemas),
    catchRequestHandlerError(getBookmarkByIdRequestHandler)
)
bookmarkRouter.delete(
    '/:id',
    validateRequest(deleteBookmarkByIdValidationSchemas),
    catchRequestHandlerError(deleteBookmarkByIdRequestHandler)
)

export default bookmarkRouter
