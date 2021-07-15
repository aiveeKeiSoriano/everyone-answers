
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import { getSession } from '../actions/sessionActions';
import AnswersPage from './AnswersPage';
import EnterNames from './EnterNames';
import LoadingPage from './Loading';
import Nav from "./Nav"

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Error = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    align-self: center;
`

export default function Dashboard() {
    let session = useSelector(state => state.session.sessionID)
    let sessionError = useSelector(state => state.session.sessionError)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSession())
        // eslint-disable-next-line
    }, [])

    return (
        <Container>
            {session &&
                <Nav />
            }
            {session === "none" ?
                <EnterNames />
                : !session ?
                    <LoadingPage />
                    : sessionError ?
                        <Error>
                            <Typography variant="h4">Error</Typography>
                            <Typography vaiant="body1">Error getting document. FirebaseError: {sessionError}</Typography>
                        </Error>
                        : <AnswersPage />
            }
        </Container>
    )
}