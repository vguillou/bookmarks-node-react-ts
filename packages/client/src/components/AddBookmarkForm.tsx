import React, { useState, SyntheticEvent } from 'react'
import { Bookmark } from '@vguillou/bookmarks-common/lib/entities/Bookmark'
import TagsInput from './TagsInput'

interface AddBookmarkFormProps {
    addBookmark: (bookmark: Bookmark) => Promise<unknown>
}

const INITIAL_STATE = {
    bookmark: { id: -1, url: '', tags: new Array<string>() },
    submitting: false,
}

const AddBookmarkForm = (props: AddBookmarkFormProps) => {
    const [bookmark, setBookmark] = useState<Bookmark>(INITIAL_STATE.bookmark)
    const [submitting, setSubmitting] = useState<boolean>(INITIAL_STATE.submitting)

    const addTag = (newTag: string): void => {
        setBookmark({ ...bookmark, tags: [...bookmark.tags, newTag] })
    }

    const removeTag = (tagToRemove: string): void => {
        setBookmark({ ...bookmark, tags: bookmark.tags.filter((tag) => tag !== tagToRemove) })
    }

    const handleInputChange = (event: SyntheticEvent) => {
        const { name, value } = event.target as HTMLInputElement
        setBookmark({ ...bookmark, [name]: value })
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        if (!bookmark.url) return

        setSubmitting(true)
        try {
            await props.addBookmark(bookmark)
            setBookmark(INITIAL_STATE.bookmark)
        } catch (e) {}
        setSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex">
                <input
                    type="text"
                    name="url"
                    value={bookmark.url}
                    onChange={handleInputChange}
                    placeholder="Add a link from Flickr or Vimeo"
                    style={{ marginRight: '8px' }}
                />
                <button disabled={submitting}>Add</button>
            </div>
            <div>
                <TagsInput bookmark={bookmark} addTag={addTag} removeTag={removeTag} />
            </div>
        </form>
    )
}

export default AddBookmarkForm
