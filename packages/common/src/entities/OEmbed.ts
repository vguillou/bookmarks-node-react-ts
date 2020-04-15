/**
 * oEmbed types enumeration
 */
enum OEmbedType {
    Photo = 'photo',
    Video = 'video',
    Link = 'link',
    Rich = 'rich',
}

/**
 * General oEmbed resource interface
 */
interface OEmbed {
    readonly originalUrl: string
    readonly type: OEmbedType
    readonly version: string
    title?: string
    authorName?: string
    authorUrl?: string
    providerName?: string
    providerUrl?: string
    cacheAge?: number
    thumbnailUrl?: string
    thumbnailWidth?: number
    thumbnailHeight?: number
}

/**
 * Base implementation of the general oEmbed resource interface
 */
class BaseOEmbed implements OEmbed {
    readonly originalUrl: string
    readonly type: OEmbedType
    readonly version: string
    title?: string
    authorName?: string
    authorUrl?: string
    providerName?: string
    providerUrl?: string
    cacheAge?: number
    thumbnailUrl?: string
    thumbnailWidth?: number
    thumbnailHeight?: number

    constructor(
        originalUrl: string,
        type: OEmbedType,
        version: string,
        title?: string,
        authorName?: string,
        authorUrl?: string,
        providerName?: string,
        providerUrl?: string,
        cacheAge?: number,
        thumbnailUrl?: string,
        thumbnailWidth?: number,
        thumbnailHeight?: number
    ) {
        this.originalUrl = originalUrl
        this.type = type
        this.version = version
        this.title = title
        this.authorName = authorName
        this.authorUrl = authorUrl
        this.providerName = providerName
        this.providerUrl = providerUrl
        this.cacheAge = cacheAge
        this.thumbnailUrl = thumbnailUrl
        this.thumbnailWidth = thumbnailWidth
        this.thumbnailHeight = thumbnailHeight
    }
}

/**
 * oEmbed photo resource
 */
class OEmbedPhoto extends BaseOEmbed implements OEmbed {
    url: string
    width: number
    height: number

    constructor(
        originalUrl: string,
        type: OEmbedType,
        version: string,
        url: string,
        width: number,
        height: number,
        title?: string,
        authorName?: string,
        authorUrl?: string,
        providerName?: string,
        providerUrl?: string,
        cacheAge?: number,
        thumbnailUrl?: string,
        thumbnailWidth?: number,
        thumbnailHeight?: number
    ) {
        super(
            originalUrl,
            type,
            version,
            title,
            authorName,
            authorUrl,
            providerName,
            providerUrl,
            cacheAge,
            thumbnailUrl,
            thumbnailWidth,
            thumbnailHeight
        )
        this.url = url
        this.width = width
        this.height = height
    }

    static fromOEmbed(oembed: BaseOEmbed, url: string, width: number, height: number): OEmbedPhoto {
        const oEmbedPhoto = { ...oembed } as OEmbedPhoto
        oEmbedPhoto.url = url
        oEmbedPhoto.width = width
        oEmbedPhoto.height = height
        return oEmbedPhoto
    }
}

/**
 * oEmbed video resource
 */
class OEmbedVideo extends BaseOEmbed implements OEmbed {
    html: string
    width: number
    height: number
    duration?: number

    constructor(
        originalUrl: string,
        type: OEmbedType,
        version: string,
        html: string,
        width: number,
        height: number,
        duration?: number,
        title?: string,
        authorName?: string,
        authorUrl?: string,
        providerName?: string,
        providerUrl?: string,
        cacheAge?: number,
        thumbnailUrl?: string,
        thumbnailWidth?: number,
        thumbnailHeight?: number
    ) {
        super(
            originalUrl,
            type,
            version,
            title,
            authorName,
            authorUrl,
            providerName,
            providerUrl,
            cacheAge,
            thumbnailUrl,
            thumbnailWidth,
            thumbnailHeight
        )
        this.html = html
        this.width = width
        this.height = height
        this.duration = duration
    }

    static fromOEmbed(
        oembed: BaseOEmbed,
        html: string,
        width: number,
        height: number,
        duration?: number
    ): OEmbedVideo {
        const oEmbedVideo = { ...oembed } as OEmbedVideo
        oEmbedVideo.html = html
        oEmbedVideo.width = width
        oEmbedVideo.height = height
        oEmbedVideo.duration = duration
        return oEmbedVideo
    }
}

/**
 * Creates the correct OEmbed implementation from raw data fetch via HTTP
 * @param originalUrl the original URL used to fetch the oEmbed resource
 * @param apiData Raw resource data fetch via HTTP
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createOEmbed(originalUrl: string, apiData: any): OEmbed {
    if (typeof apiData !== 'object' || !apiData || !apiData.type || !apiData.version)
        throw new Error(`Invalid OEmbed resource: ${originalUrl}`)

    const oEmbed = new BaseOEmbed(
        originalUrl,
        apiData.type,
        apiData.version,
        apiData.title,
        apiData.author_name,
        apiData.author_url,
        apiData.provider_name,
        apiData.provider_url,
        apiData.cache_age,
        apiData.thumbnail_url,
        apiData.thumbnail_width,
        apiData.thumbnail_height
    )

    switch (oEmbed.type) {
        case OEmbedType.Photo: {
            return OEmbedPhoto.fromOEmbed(oEmbed, apiData.url, apiData.width, apiData.height)
        }
        case OEmbedType.Video: {
            return OEmbedVideo.fromOEmbed(
                oEmbed,
                apiData.html,
                apiData.width,
                apiData.height,
                apiData.duration
            )
        }
        case OEmbedType.Link:
        case OEmbedType.Rich:
        default: {
            throw new Error(`Unsupported OEmbed type ${oEmbed.type} from ${originalUrl}`)
        }
    }
}

export { OEmbedType, OEmbed, OEmbedPhoto, OEmbedVideo, createOEmbed }
