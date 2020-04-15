import { ImageMedia, VideoMedia } from './Media'
import { OEmbed, OEmbedType, OEmbedPhoto, OEmbedVideo } from './OEmbed'

interface Bookmark {
    readonly id: number
    readonly url: string
    title?: string
    author?: string
    createdAt?: Date
    thumbnailUrl?: string
    providerName?: string
    tags: string[]
}

interface MediaBookmark extends Bookmark {
    media: ImageMedia | VideoMedia
}

class LinkableBookmark implements Bookmark {
    readonly id: number
    readonly url: string
    title?: string
    author?: string
    createdAt?: Date = new Date()
    thumbnailUrl?: string
    providerName?: string
    tags: Array<string> = []

    constructor(
        id: number,
        url: string,
        title?: string,
        author?: string,
        thumbnailUrl?: string,
        providerName?: string,
        tags?: Array<string>
    ) {
        this.id = id
        this.url = url
        this.title = title
        this.author = author
        this.thumbnailUrl = thumbnailUrl
        this.providerName = providerName
        this.tags = tags || []
    }
}

class ImageBookmark extends LinkableBookmark implements MediaBookmark {
    media: ImageMedia

    constructor(
        id: number,
        url: string,
        imageWidth: number,
        imageHeight: number,
        title?: string,
        author?: string,
        thumbnailUrl?: string,
        providerName?: string,
        tags?: Array<string>
    ) {
        super(id, url, title, author, thumbnailUrl, providerName, tags)
        this.media = {
            width: imageWidth,
            height: imageHeight,
        }
    }
}

class VideoBookmark extends LinkableBookmark implements MediaBookmark {
    media: VideoMedia

    constructor(
        id: number,
        url: string,
        videoHtml: string,
        videoWidth: number,
        videoHeight: number,
        videoLength?: number,
        title?: string,
        author?: string,
        thumbnailUrl?: string,
        providerName?: string,
        tags?: Array<string>
    ) {
        super(id, url, title, author, thumbnailUrl, providerName, tags)
        this.media = {
            html: videoHtml,
            width: videoWidth,
            height: videoHeight,
            length: videoLength,
        }
    }
}

function createBookmarkFromOEmbed(oEmbed: OEmbed, tags?: Array<string>): Bookmark {
    switch (oEmbed.type) {
        case OEmbedType.Photo: {
            const oEmbedPhoto = oEmbed as OEmbedPhoto
            return new ImageBookmark(
                -1,
                oEmbedPhoto.url,
                oEmbedPhoto.width,
                oEmbedPhoto.height,
                oEmbedPhoto.title,
                oEmbedPhoto.authorName,
                oEmbedPhoto.thumbnailUrl,
                oEmbedPhoto.providerName,
                tags
            )
        }
        case OEmbedType.Video: {
            const oEmbedVideo = oEmbed as OEmbedVideo
            return new VideoBookmark(
                -1,
                oEmbedVideo.originalUrl,
                oEmbedVideo.html,
                oEmbedVideo.width,
                oEmbedVideo.height,
                oEmbedVideo.duration,
                oEmbedVideo.title,
                oEmbedVideo.authorName,
                oEmbedVideo.thumbnailUrl,
                oEmbedVideo.providerName,
                tags
            )
        }
        case OEmbedType.Link:
        case OEmbedType.Rich:
        default: {
            throw new Error(`Unsupported OEmbed type ${oEmbed.type}: ${oEmbed}`)
        }
    }
}

interface BookmarksResponse {
    bookmarks: Array<Bookmark>
    count: number
    nextURL?: string
    previousURL?: string
}

export {
    Bookmark,
    MediaBookmark,
    LinkableBookmark,
    ImageBookmark,
    VideoBookmark,
    createBookmarkFromOEmbed,
    BookmarksResponse,
}
