import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import EditableTextField from '../EditableTextField/EditableTextField';
import s from './PeopleInfo.module.css'

type People = {
    name: string,
    skin_color: string,
    gender: string,
    eye_color: string,
    mass: string,
    height: string,
    url: string,
}

export default function PeopleInfo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const url = `https://swapi.dev/api/people/${id}`

    const [people, setPeople] = useState({} as People)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(url)
            .then(function (response) {
                setPeople(response.data)

                setLoading(false)

            })

    }, [url])


    const backHandler = () => navigate('/people');
    return (
        <>
            <Loader isLoading={loading} />

            {
                people && <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className={s.form}
                    data-testid="people-info"
                >
                    <h3 className={s.header}>{people?.name}</h3>
                    <EditableTextField title='Name' value={people?.name} />
                    <EditableTextField title='Skin Color' value={people?.skin_color} />
                    <EditableTextField title='Gender' value={people?.gender} />
                    <EditableTextField title='Eye Color' value={people?.eye_color} />
                    <EditableTextField title='Weight' value={people?.mass} />
                    <EditableTextField title='Height' value={people?.height} />
                </Grid>
            }
            <Button variant="contained" onClick={backHandler}>{`back to list`}</Button>
        </>
    )
}