import { useEffect, useMemo, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';
import { SEARCH_DELAY } from '../../constants';

interface SearchFieldProps {
    onSearch: React.Dispatch<React.SetStateAction<string>>,
}


const Search = styled('div')(({ theme }) => ({
    position: 'relative',

    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.5),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginBottom: '1rem',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchField(props: SearchFieldProps) {
    const { onSearch } = props;

    const [searchedName, setSearchedName] = useState('')

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setSearchedName(e.target.value)

    const searchDelayed = useMemo(() => {
        return debounce(onChangeHandler, SEARCH_DELAY);
    }, []);

    useEffect(() => {
        onSearch(searchedName)
    }, [onSearch, searchedName])

    useEffect(() => {
        return () => {
            searchDelayed.cancel();
        };
    });

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={searchDelayed}
                />
            </Search>
        </Box>
    );
}