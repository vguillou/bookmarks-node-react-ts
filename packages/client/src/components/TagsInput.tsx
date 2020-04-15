import React, { SyntheticEvent } from 'react'
import { Bookmark } from '@vguillou/bookmarks-common/lib/entities/Bookmark'
import { Chip, TagsInputContainer } from './styles'

interface TagsInputProps {
    bookmark: Bookmark
    addTag: (newTag: string) => unknown
    removeTag?: (tagToRemove: string) => unknown
}

const TagsInput = (props: TagsInputProps) => {
    const handleInputTagKeypress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            event.preventDefault()
            const inputElement = event.target as HTMLInputElement
            const value = inputElement.value.trim().toLowerCase()
            if (!value || props.bookmark.tags.includes(value)) return
            props.addTag(value)
            inputElement.value = ''
        }
    }

    const handleClick = (event: SyntheticEvent): void => {
        if (props.removeTag) props.removeTag((event.target as HTMLInputElement).innerText)
    }

    return (
        <TagsInputContainer>
            <div>
                {props.bookmark.tags.length
                    ? props.bookmark.tags.map((tag) => (
                          <Chip key={tag} removable={!!props.removeTag} onClick={handleClick}>
                              {tag}
                          </Chip>
                      ))
                    : 'No tags'}
            </div>
            <input
                type="text"
                name="tags"
                onKeyPress={handleInputTagKeypress}
                placeholder="Add tag (press Enter)"
            />
        </TagsInputContainer>
    )
}

export default TagsInput
