
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import { getList, listenToSession } from '../actions/studentActions';
import SelectName from "./SelectName"
import TypeAnswer from "./TypeAnswer"
import LoadingPage from './Loading';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Error = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    align-self: center;
    padding: 3em;
`

export default function StudentPage() {

    let session = useSelector(state => state.student.session)
    let selected = useSelector(state => state.student.selected)
    let error = useSelector(state => state.student.error)
    let dispatch = useDispatch()
    let { sessionID } = useParams()

    useEffect(() => {
        dispatch(getList(sessionID))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (session) {
            dispatch(listenToSession())
        }
    }, [session])

    return (
        <Container>
            {error ?
                <Error>
                    <Typography variant="h4">Error</Typography>
                    <Typography vaiant="body1">{error}</Typography>
                </Error>
                : !session ?
                    <LoadingPage />
                    : selected ?
                        <TypeAnswer />
                        : <SelectName />
            }
        </Container>
    )
}