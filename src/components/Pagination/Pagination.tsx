import React, { Dispatch, SetStateAction } from 'react'
import { Button, Stack } from '@mui/material';
import { Value } from '../PeopleList/PeopleList';

interface PaginationProps {
    next: URL,
    previous: URL,
    onButtonClick: Dispatch<SetStateAction<Value>>,
}
type URL = string | null

export default function Pagination(props: PaginationProps) {
    const { next, previous, onButtonClick } = props;
    const getPage = (url: URL) => url?.split('=')[2]
    const nextPage = getPage(next);
    const previousPage = getPage(previous)
    return (
        <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" disabled={!previous} onClick={() => previous && onButtonClick(previousPage)}>{`previous page`}</Button>
            <Button variant="contained" disabled={!next} onClick={() => next && onButtonClick(nextPage)}>{`next page`}</Button>
        </Stack>
    );
}