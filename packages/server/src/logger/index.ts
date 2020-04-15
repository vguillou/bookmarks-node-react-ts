import { createLogger, format } from 'winston'
import consoleTransportFactory from './consoleTransport.factory'
import { envConfig, logConfig } from '../config'

/* eslint-disable no-param-reassign */
/**
 * Axios error formatter, to only log the response as well as the config
 * @returns formatter
 */
const axiosErrorFormatter = format((info) => {
    if (!info) return info
    if (info.isAxiosError) {
        const response = {
            status: info.response?.status,
            statusText: info.response?.statusText,
            data: info.response?.data,
            headers: info.response?.headers,
        }
        info.response = response
        delete info.request

        info.__toJSON = info.toJSON
        info.toJSON = (): object => ({
            ...info.__toJSON(),
            response,
        })
    }
    return info
})
/* eslint-enable no-param-reassign */

/**
 * Main application logger.
 */
const logger = createLogger({
    exitOnError: false, // We want to control when we exit the process
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        format.errors({ stack: true }),
        axiosErrorFormatter(),
        format.simple()
    ),
    defaultMeta: logConfig.defaultMeta,
    transports: [
        consoleTransportFactory({
            production: envConfig.production,
            level: logConfig.minLevel,
            defaultMeta: logConfig.defaultMeta,
        }),
    ],
})

logger.silly('Logger initialized')

export default logger
