
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getList } from '../actions/studentActions';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import SelectName from "./SelectName"
import TypeAnswer from "./TypeAnswer"

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Loading = styled.div`
    width: 800px;
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-self: center;
`

export default function StudentPage() {

    let session = useSelector(state => state.student.session)
    let selected = useSelector(state => state.student.selected)
    let dispatch = useDispatch()
    let { sessionID } = useParams()

    useEffect(() => {
        dispatch(getList(sessionID))
        // eslint-disable-next-line
    }, [])

    return (
        <Container>
            {!session ?
                <Loading>
                    <Typography variant="h4">Loading...</Typography>
                    <LinearProgress />
                </Loading>
                : selected ?
                  <TypeAnswer />  
                : <SelectName />
            }
        </Container>
    )
}