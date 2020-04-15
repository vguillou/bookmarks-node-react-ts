import Axios, { AxiosResponse } from 'axios'
import { Bookmark, BookmarksResponse } from '@vguillou/bookmarks-common/lib/entities/Bookmark'

const bookmarkApi = Axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
})

const DEFAULT_RESULTS_PER_PAGE = 6

export async function getBookmarks(
    pageNumber: number = 1,
    resultsPerPage: number = DEFAULT_RESULTS_PER_PAGE
): Promise<BookmarksResponse> {
    const adjustedPageNumber = pageNumber > 0 ? pageNumber : 1
    const params = {
        limit: resultsPerPage,
        offset: (adjustedPageNumber - 1) * resultsPerPage,
    }
    const data = await unwrapResponse(bookmarkApi.get('/bookmarks', { params }))
    return data.data
}

export async function postBookmark(bookmark: Bookmark): Promise<Bookmark> {
    const data = await unwrapResponse(
        bookmarkApi.post('/bookmarks', {
            url: bookmark.url,
            tags: bookmark.tags,
        })
    )
    return data.data
}

export async function putBookmark(bookmark: Bookmark): Promise<Bookmark> {
    const data = await unwrapResponse(bookmarkApi.put('/bookmarks', { ...bookmark }))
    return data.data
}

export async function getBookmarkById(id: number): Promise<Bookmark> {
    const data = await unwrapResponse(bookmarkApi.get(`/bookmarks/${id}`))
    return data.data
}

export async function deleteBookmarkById(id: number): Promise<void> {
    await bookmarkApi.delete(`/bookmarks/${id}`)
}

export async function getBookmarksTags(): Promise<Array<string>> {
    const data = await unwrapResponse(bookmarkApi.get('/bookmarks/tags'))
    return data.data
}

async function unwrapResponse(promise: Promise<AxiosResponse>): Promise<any> {
    try {
        return (await promise).data
    } catch (e) {
        throw e.response?.data ? e.response.data : e
    }
}
