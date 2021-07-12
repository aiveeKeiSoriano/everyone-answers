
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { signOut } from '../actions/authActions';
import EnterNames from './EnterNames';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const AnswersPage = styled.div``

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
    let dispatch = useDispatch()
    let session;
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