import { resolve } from 'path'
import { config } from 'dotenv'

// Load the .env configuration. Throw if not found
const result = config({ path: resolve(__dirname, '../../.env') })
if (result.error) {
    throw result.error
}

const envConfig = {
    production: process.env.NODE_ENV === 'production',
}
export default envConfig
