import Axios from 'axios'

/**
 * Flick API instance
 */
const flickrApi = Axios.create({
    baseURL: 'https://flickr.com/services',
})
export default flickrApi
