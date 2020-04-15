import { format, transports } from 'winston'
import { consoleFormat } from 'winston-console-format'
import { ConsoleTransportInstance, ConsoleTransportOptions } from 'winston/lib/winston/transports'

/**
 * @param production If the app runs in production mode
 * @param level Minimal log level. One of 'error', 'warn', 'info', 'verbose', 'debug', 'silly'
 * @param defaultMeta Default metadata added to each log
 */
interface ConsoleTransportFactoryOptions {
    production: boolean
    level: string
    defaultMeta: object
}

/**
 * Console transport factory
 */
function consoleTransportFactory({
    production,
    level,
    defaultMeta,
}: ConsoleTransportFactoryOptions): ConsoleTransportInstance {
    const options: ConsoleTransportOptions = {
        level,
    }

    if (!production) {
        // Development console formatter: Colorized, inline human readable, clickable paths, etc...
        options.format = format.combine(
            format.colorize({ all: true }),
            format.padLevels(),
            format.ms(),
            consoleFormat({
                showMeta: true,
                metaStrip: [...Object.keys(defaultMeta), 'timestamp'],
                inspectOptions: {
                    depth: 10,
                    colors: true,
                    maxArrayLength: 100,
                    breakLength: 100,
                    compact: Infinity,
                },
            })
        )
    }

    return new transports.Console(options)
}

export default consoleTransportFactory
