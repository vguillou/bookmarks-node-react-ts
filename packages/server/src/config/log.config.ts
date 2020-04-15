import serverConfig from './server.config'

const logConfig = {
    minLevel: process.env.LOG_MIN_LEVEL || 'info',
    defaultMeta: {
        app: serverConfig.appName,
        version: serverConfig.appName,
    },
}
export default logConfig
