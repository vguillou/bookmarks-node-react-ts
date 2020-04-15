import React from 'react'
import { Bookmark } from '@vguillou/bookmarks-common/lib/entities/Bookmark'
import { Card, Chip, Grid } from './styles'

interface BookmarkListProps {
    bookmarks: Array<Bookmark>
    editBookmark: (bookmark: Bookmark) => void
    deleteBookmark: (id: number) => Promise<unknown>
}

const BookmarkList = (props: BookmarkListProps) => {
    if (props.bookmarks.length <= 0)
        return <div className="full-container text-center">No bookmarks</div>

    return (
        <Grid>
            {props.bookmarks.map((bookmark) => (
                <Card key={bookmark.id} img={bookmark.thumbnailUrl}>
                    <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="header"
                    >
                        <b>{bookmark.title}</b>, by {bookmark.author}
                    </a>
                    <div className="bottom-bar">
                        <div>
                            {bookmark.tags.map((tag) => (
                                <Chip key={tag}>{tag}</Chip>
                            ))}
                        </div>
                        <div className="button-bar">
                            <button
                                onClick={() => props.editBookmark(bookmark)}
                                className="button muted-button"
                                title="Edit bookmark"
                            >
                                ✎
                            </button>
                            <button
                                onClick={() => props.deleteBookmark(bookmark.id)}
                                className="button muted-button"
                                title="Delete bookmark"
                            >
                                X
                            </button>
                        </div>
                    </div>
                </Card>
            ))}
        </Grid>
    )
}

export default BookmarkList
