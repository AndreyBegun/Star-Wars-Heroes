import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Grid, Link } from '@mui/material';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import SearchField from '../SearchField/SearchField';
import { BASE_URL } from '../../constants';

type People = {
    name: string,
    skin_color: string,
    gender: string,
    eye_color: string,
    mass: string,
    height: string,
    url: string,
}
export type Value = string | null | undefined


export default function PeopleList() {

    const [searchParam, setSearchParam] = useState('')
    const [pageParam, setPageParam] = useState<Value>('1')
    const [nextUrl, setNextUrl] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)
    const [peopleList, setPeopleList] = useState<People[]>([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        let controller = new AbortController()
        let signal = controller.signal
        setLoading(true)
        axios.get(BASE_URL, {
            params: { search: searchParam, page: pageParam },
            signal: signal
        })
            .then(function (response) {
                setPeopleList(response.data.results)
                setNextUrl(response.data.next)
                setPrevUrl(response.data.previous)

                setLoading(false)

            })
            .catch((e) => {
                if (axios.isCancel(e)) {
                    console.error('Operation canceled');
                }
            })
        return () => controller.abort()

    }, [searchParam, pageParam])

    const getIdFromUrl = (url: string) => {
        const urlArray = url.split('/')
        return urlArray[urlArray.length - 2]
    }


    return (
        <Grid container data-testid="people-list">
            <SearchField onSearch={setSearchParam} />
            <TableContainer component={Paper} >

                <Loader isLoading={loading} />


                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Skin</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Eye</TableCell>
                            <TableCell align="right">Weight</TableCell>
                            <TableCell align="right">Height</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {peopleList.map((row) => (
                            <TableRow
                                key={row?.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link href={`people/${getIdFromUrl(row.url)}`} underline="always" >{row.name}</Link>
                                </TableCell>
                                <TableCell align="right">{row.skin_color}</TableCell>
                                <TableCell align="right">{row.gender}</TableCell>
                                <TableCell align="right">{row.eye_color}</TableCell>
                                <TableCell align="right">{row.mass}</TableCell>
                                <TableCell align="right">{row.height}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination next={nextUrl} previous={prevUrl} onButtonClick={setPageParam} />
        </Grid>
    );
}