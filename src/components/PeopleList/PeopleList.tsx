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

type People = {
    name: string,
    skin_color: string,
    gender: string,
    eye_color: string,
    mass: string,
    height: string,
    url: string,
}
export default function PeopleList() {

    const [url, setUrl] = useState(`https://swapi.dev/api/people`)
    const [nextUrl, setNextUrl] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)
    const [peopleList, setPeopleList] = useState([] as People[])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        axios.get(url)
            .then(function (response) {
                setPeopleList(response.data.results)
                setNextUrl(response.data.next)
                setPrevUrl(response.data.previous)

                setLoading(false)

            })

    }, [url])

    const getIdFromUrl = (url: string) => {
        const urlArray = url.split('/')
        return urlArray[urlArray.length - 2]
    }


    return (
        <Grid container data-testid="people-list">
            <SearchField onSearch={setUrl} />
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
            <Pagination next={nextUrl} previous={prevUrl} onButtonClick={setUrl} />
        </Grid>
    );
}