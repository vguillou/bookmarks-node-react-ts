import path from 'path'
import * as packageDotJson from '../../package.json'

const DEFAULT_HOST = '127.0.0.1'
const DEFAULT_PORT = 3000

const serverConfig = {
    appName: packageDotJson.name,
    appVersion: packageDotJson.version,
    useCors: process.env.CORS === 'true',
    host: process.env.NODE_HOST || DEFAULT_HOST,
    port: Number.parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    serveSwaggerUI: process.env.SERVE_SWAGGER_UI === 'true',
    frontEndDir: process.env.FRONT_END_DIR
        ? path.join(__dirname, `../../${process.env.FRONT_END_DIR}`)
        : undefined,
}
export default serverConfig
