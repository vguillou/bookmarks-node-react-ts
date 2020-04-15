import { STATUS_CODES } from 'http'

/**
 * The standard API response
 */
class ApiResponse {
    statusCode: number
    message: string
    data: string | object | undefined

    /**
     * Constructor
     * @param statusCode HTTP status code of the response
     * @param data The optional response data
     * @param message The optional customized message. Will default to the standard HTTP status message corresponding to the `statusCode`
     */
    constructor(statusCode: number, data?: string | object, message?: string) {
        this.statusCode = statusCode
        this.message = message || STATUS_CODES[statusCode] || 'Unknown'
        this.data = data
    }
}

export default ApiResponse
