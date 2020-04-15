import React from 'react'
import { Link } from 'react-router-dom'
import { PaginationContainer } from './styles'
import Pagination from '../entities/Pagination'

const PaginationNav = (props: Pagination) => (
    <PaginationContainer>
        <span>
            {props.previous > 0 && (
                <Link
                    to={`/${props.previous === 1 ? '' : props.previous}`}
                    replace
                    className="button muted-button no-margin-bottom"
                >
                    &lt;
                </Link>
            )}
        </span>

        <span>{(props.previous > 0 || props.next > 0) && <b>Page {props.current}</b>}</span>

        <span>
            {props.next > 0 && (
                <Link to={`/${props.next}`} replace className="button muted-button">
                    &gt;
                </Link>
            )}
        </span>
    </PaginationContainer>
)

export default PaginationNav
