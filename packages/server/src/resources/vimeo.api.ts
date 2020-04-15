import Axios from 'axios'

/**
 * Vimeo API instance
 */
const vimeoApi = Axios.create({
    baseURL: 'https://vimeo.com/api',
})
export default vimeoApi
