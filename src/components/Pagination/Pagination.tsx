import React, { Dispatch, SetStateAction } from 'react'
import { Button, Stack } from '@mui/material';

interface PaginationProps {
    next: string | null,
    previous: string | null,
    onButtonClick: Dispatch<SetStateAction<string>>,
}

export default function Pagination(props: PaginationProps) {
    const { next, previous, onButtonClick } = props;
    return (
        <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" disabled={!previous} onClick={() => previous && onButtonClick(previous)}>{`previous page`}</Button>
            <Button variant="contained" disabled={!next} onClick={() => next && onButtonClick(next)}>{`next page`}</Button>
        </Stack>
    );
}