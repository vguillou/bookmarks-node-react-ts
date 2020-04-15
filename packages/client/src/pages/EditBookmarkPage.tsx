import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Bookmark } from '@vguillou/bookmarks-common/lib/entities/Bookmark'
import { getBookmarkById, putBookmark } from '../api/bookmark.api'
import { Spinner, SpinnerContainer } from '../components/styles'
import EditBookmarkForm from '../components/EditBookmarkForm'

const INITIAL_STATE = {
    editedBookmark: { id: -1, title: '', url: '', tags: new Array<string>() },
    loading: false,
}

function EditBookmarkPage() {
    const { id } = useParams()
    const editedBookmarkId = Number.parseInt(id || '', 10)
    const history = useHistory()

    const [editedBookmark, setEditedBookmark] = useState<Bookmark>(INITIAL_STATE.editedBookmark)
    const [loading, setLoading] = useState<boolean>(INITIAL_STATE.loading)

    useEffect(() => {
        setLoading(true)
        getBookmarkById(editedBookmarkId)
            .then(setEditedBookmark)
            .catch(notifyError)
            .then(() => setLoading(false))
    }, [editedBookmarkId])

    const notifyError = (e: any) =>
        toast.error(e.message || 'Unknown error', { position: toast.POSITION.BOTTOM_CENTER })

    const updateBookmark = (bookmark: Bookmark) => {
        setLoading(true)
        return putBookmark(bookmark)
            .then(() =>
                toast.success('Bookmark updated', { position: toast.POSITION.BOTTOM_CENTER })
            )
            .then(history.goBack)
            .catch(notifyError)
            .then(() => setLoading(false))
    }

    if (loading)
        return (
            <SpinnerContainer>
                <Spinner />
            </SpinnerContainer>
        )

    return (
        <EditBookmarkForm
            key={editedBookmarkId}
            editedBookmark={editedBookmark}
            updateBookmark={updateBookmark}
            cancelEditBookmark={history.goBack}
        />
    )
}

export default EditBookmarkPage
