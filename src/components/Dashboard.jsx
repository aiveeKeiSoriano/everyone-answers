
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

export default function Dashboard() {
    let user = useSelector(state => state.auth.user)
    let session = useSelector(state => state.session.session)
    let dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getSession())
        // eslint-disable-next-line
    }, [])

    return (
        <Container>
            <Nav>
                <img onClick={() => dispatch(signOut())} src={user.photoURL} alt="profile" />
            </Nav>
            {session ?
                <AnswersPage />
                :
                <EnterNames />
            }   
        </Container>
    )
}