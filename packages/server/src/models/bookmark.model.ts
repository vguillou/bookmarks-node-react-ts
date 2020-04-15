import { Bookmark } from '@vguillou/bookmarks-common/lib/entities/Bookmark'
import initialData from './initial.data'

/**
 * Stored bookmarks Map. Should be replaced by an actual DataBase
 */
const bookmarksMap = new Map<number, Bookmark>(
    initialData.map((item, index) => [
        index,
        {
            id: index,
            url: item.url,
            title: item.title,
            author: item.author,
            media: item.media,
            thumbnailUrl: item.thumbnailUrl,
            providerName: item.providerName,
            tags: item.tags,
            createdAt: new Date(item.createdAt),
        },
    ])
)

let nextId = bookmarksMap.size

function bookmarkExists(bookmark: Bookmark): boolean {
    return (
        bookmarksMap.has(bookmark.id) ||
        Array.from(bookmarksMap.values()).some(
            (existingBookmark) => existingBookmark.url === bookmark.url
        )
    )
}

/**
 * Retrieve a stored bookmark
 * @param id Unique identifer of the bookmark to retrieve
 * @returns Promise resolving to the stored bookmark, or `undefined` if it does not exist
 */
async function getBookmark(id: number): Promise<Bookmark | undefined> {
    return bookmarksMap.get(id)
}

/**
 * Retrieve all bookmarks
 * @returns List of the requested bookmarks
 */
async function getAllBookmarks(): Promise<Array<Bookmark>> {
    const bookmarks = Array.from(bookmarksMap.values())
    return bookmarks.sort(
        (b1, b2) => (b2.createdAt?.getTime() || 0) - (b1.createdAt?.getTime() || 0)
    )
}

/**
 * Retrieve filtered bookmarks
 * @param limit Max number of results
 * @param offset Number of first results to ignore
 * @returns List of the requested bookmarks
 */
async function getBookmarks(limit: number, offset: number): Promise<Array<Bookmark>> {
    const bookmarks = await getAllBookmarks()
    return bookmarks.slice(offset, offset + limit)
}

/**
 * Retrieve the total count of bookmarks
 * @returns The requested total count bookmarks
 */
async function getBookmarksCount(): Promise<number> {
    return Array.from(bookmarksMap.values()).length
}

/**
 * Add a stored bookmark
 * @param bookmark Bookmark to store
 * @returns `true` if successfully added, `false` otherwise
 */
async function addBookmark(bookmark: Bookmark): Promise<number | undefined> {
    if (bookmarkExists(bookmark)) return undefined
    const id = nextId++
    const bookmarkToAdd = { ...bookmark, id, createdAt: new Date() }
    bookmarksMap.set(bookmarkToAdd.id, bookmarkToAdd)
    return id
}

/**
 * Update a stored bookmark
 * @param bookmark Bookmark to update
 * @returns `true` if successfully updated, `false` otherwise (ie does not exist)
 */
async function updateBookmark(bookmark: Bookmark): Promise<boolean> {
    if (!bookmarkExists(bookmark)) return false
    bookmarksMap.set(bookmark.id, bookmark)
    return true
}

/**
 * Delete a stored bookmark
 * @param id Unique identifer of the bookmark to delete
 * @returns `true` if successfully deleted, `false` otherwise (ie does not exist)
 */
async function deleteBookmark(id: number): Promise<boolean> {
    bookmarksMap.delete(id)
    return true
}

export {
    getBookmark,
    getAllBookmarks,
    getBookmarks,
    getBookmarksCount,
    addBookmark,
    updateBookmark,
    deleteBookmark,
}
