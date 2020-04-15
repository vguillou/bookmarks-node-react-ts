import { AxiosInstance } from 'axios'
import { OEmbed, createOEmbed } from '@vguillou/bookmarks-common/lib/entities/OEmbed'

/**
 * Parameter to fetch an oEmbed resource
 */
interface GetOEmbedParameters {
    url: string
    maxHeight?: number
    maxWidth?: number
}

/**
 * Fetch an oEmbed resource
 * @param api Api instance from which to fetch the oEmbed resource
 * @param params Fetch parameters
 * @returns A Promise resolving to the oEmbed resource
 * @throws Error
 */
async function getOEmbed(
    api: AxiosInstance,
    { url, maxHeight, maxWidth }: GetOEmbedParameters
): Promise<OEmbed> {
    const response = await api.get('/oembed.json', {
        params: {
            url,
            maxheight: maxHeight,
            maxwidth: maxWidth,
        },
    })
    return createOEmbed(url, response.data)
}
export { getOEmbed }
