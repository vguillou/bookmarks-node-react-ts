import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Bookmark } from '@vguillou/bookmarks-common/lib/entities/Bookmark'
import { Spinner, SpinnerContainer } from '../components/styles'
import BookmarkList from '../components/BookmarkList'
import AddBookmarkForm from '../components/AddBookmarkForm'
import PaginationNav from '../components/PaginationNav'
import { getBookmarks, deleteBookmarkById, postBookmark } from '../api/bookmark.api'
import Pagination from '../entities/Pagination'

const INITIAL_STATE = {
    bookmarks: [],
    loading: false,
    forceRefresh: false,
}

const BookmarksPage = () => {
    const { page } = useParams()
    const currentPage = Number.parseInt(page || '1', 10)
    const history = useHistory()

    const [bookmarks, setBookmarks] = useState<Array<Bookmark>>(INITIAL_STATE.bookmarks)
    const [loading, setLoading] = useState<boolean>(INITIAL_STATE.loading)
    const [forceRefresh, setForceRefresh] = useState<boolean>(INITIAL_STATE.loading)
    const [pagination, setPagination] = useState<Pagination>({
        current: currentPage,
        next: currentPage + 1,
        previous: currentPage - 1,
    })

    useEffect(() => {
        setLoading(true)
        getBookmarks(currentPage)
            .then((data) => {
                setBookmarks(data.bookmarks)
                setPagination((previousPagination) => ({
                    ...previousPagination,
                    current: currentPage,
                    next: data.nextURL ? currentPage + 1 : -1,
                    previous: data.previousURL ? currentPage - 1 : -1,
                }))
            })
            .catch(notifyError)
            .then(() => setLoading(false))
    }, [currentPage, forceRefresh])

    const notifyError = (e: any) =>
        toast.error(e.message || 'Unknown error', { position: toast.POSITION.BOTTOM_CENTER })

    const addBookmark = async (bookmark: Bookmark) => {
        return postBookmark(bookmark)
            .then(() => toast.success('Bookmark added', { position: toast.POSITION.BOTTOM_CENTER }))
            .catch(notifyError)
            .then(() => setForceRefresh(!forceRefresh))
    }

    const deleteBookmark = (id: number) => {
        return deleteBookmarkById(id)
            .then(() =>
                toast.success('Bookmark deleted', { position: toast.POSITION.BOTTOM_CENTER })
            )
            .catch(notifyError)
            .then(() => setForceRefresh(!forceRefresh))
    }

    const editBookmark = (bookmark: Bookmark) => {
        history.push(`/edit/${bookmark.id}`)
    }

    return (
        <div>
            <AddBookmarkForm addBookmark={addBookmark} />
            {loading ? (
                <SpinnerContainer>
                    <Spinner />
                </SpinnerContainer>
            ) : (
                <BookmarkList
                    bookmarks={bookmarks}
                    deleteBookmark={deleteBookmark}
                    editBookmark={editBookmark}
                />
            )}
            <PaginationNav {...pagination} />
        </div>
    )
}

export default BookmarksPage
