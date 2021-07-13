
import { LinearProgress } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import { signOut } from '../actions/authActions';
import { getSession } from '../actions/sessionActions';
import AnswersPage from './AnswersPage';
import EnterNames from './EnterNames';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Nav = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 1em;

    img {
        width: 60px;
        border-radius: 50%;
        cursor: pointer;
    }
`

const Loading = styled.div`
    width: 800px;
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-self: center;
`

export default function Dashboard() {
    let user = useSelector(state => state.auth.user)
    let session = useSelector(state => state.session.sessionID)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSession())
        // eslint-disable-next-line
    }, [])

    return (
        <Container>
            {session &&
                <Nav>
                    <img onClick={() => dispatch(signOut())} src={user.photoURL} alt="profile" />
                </Nav>
            }
            {session && session !== "none" ?
                <AnswersPage />
                : session === "none" ?
                    <EnterNames />
                : <Loading>
                    <Typography variant="h4">Loading...</Typography>
                    <LinearProgress />
                </Loading>
            }
        </Container>
    )
}