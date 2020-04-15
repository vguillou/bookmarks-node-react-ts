/**
 * Image media properties
 */
interface ImageMedia {
    width: number
    height: number
}

/**
 * Video media properties
 */
interface VideoMedia {
    html: string
    width: number
    height: number
    length?: number
}

export { ImageMedia, VideoMedia }
