import React, { useState, SyntheticEvent } from 'react'
import {
    Bookmark,
    VideoBookmark,
    ImageBookmark,
} from '@vguillou/bookmarks-common/lib/entities/Bookmark'
import TagsInput from './TagsInput'
import { ButtonBar, MediaContainer } from './styles'

interface EditBookmarkFormProps {
    editedBookmark: Bookmark
    updateBookmark: (bookmark: Bookmark) => void
    cancelEditBookmark: () => void
}

const EditBookmarkForm = (props: EditBookmarkFormProps) => {
    const [bookmark, setBookmark] = useState<Bookmark>(props.editedBookmark)

    const addTag = (newTag: string): void => {
        setBookmark({ ...bookmark, tags: [...bookmark.tags, newTag] })
    }

    const removeTag = (tagToRemove: string): void => {
        setBookmark({ ...bookmark, tags: bookmark.tags.filter((tag) => tag !== tagToRemove) })
    }

    const handleSubmit = (event: SyntheticEvent): void => {
        event.preventDefault()
        props.updateBookmark(bookmark)
    }

    const handleCancel = (event: SyntheticEvent) => {
        event.preventDefault()
        props.cancelEditBookmark()
    }

    const secondsToTimeString = (sec?: number): string => {
        if (!sec) return ''
        const minutes = Math.floor(sec / 60)
        const seconds = Math.floor(sec - minutes * 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const isVideoBookmark = (): boolean => {
        return bookmark.providerName === 'Vimeo'
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>{bookmark.title}</h3>
            <div>from {bookmark.author}</div>
            <div>
                {isVideoBookmark() ? (
                    <MediaContainer>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: (bookmark as VideoBookmark).media?.html,
                            }}
                        />
                        <div>
                            <a href={bookmark.url} target="_blank" rel="noreferrer noopener">
                                View on {bookmark.providerName || 'original platform'}
                            </a>
                        </div>
                        <div>
                            {(bookmark as VideoBookmark).media?.width}px x{' '}
                            {(bookmark as VideoBookmark).media?.height}px
                        </div>
                        <div>{secondsToTimeString((bookmark as VideoBookmark).media?.length)}</div>
                    </MediaContainer>
                ) : (
                    <MediaContainer>
                        <a href={bookmark.url} target="_blank" rel="noreferrer noopener">
                            <img src={bookmark.url} alt={bookmark.title} />
                        </a>
                        <div>
                            {(bookmark as ImageBookmark).media?.width}px x{' '}
                            {(bookmark as ImageBookmark).media?.height}px
                        </div>
                    </MediaContainer>
                )}
            </div>
            <div>
                <TagsInput bookmark={bookmark} addTag={addTag} removeTag={removeTag} />
            </div>
            <ButtonBar>
                <button onClick={handleSubmit} className="button">
                    Update
                </button>
                <button onClick={handleCancel} className="button muted-button">
                    Cancel
                </button>
            </ButtonBar>
        </form>
    )
}

export default EditBookmarkForm
