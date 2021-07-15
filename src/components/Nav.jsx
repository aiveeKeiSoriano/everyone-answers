
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@material-ui/core';
import { signOut } from '../actions/authActions';

const Container = styled.div`
display: flex;
justify-content: flex-end;
padding: 1em 1em 0em 1em;

img {
    width: 60px;
    border-radius: 50%;
}
`

export default function Nav() {

    let user = useSelector(state => state.auth.user)
    let dispatch = useDispatch()

    return (
        <Container>
            <Tooltip title="Log Out">
                <IconButton onClick={() => dispatch(signOut())}>
                    <img src={user.photoURL} alt="profile" />
                </IconButton>
            </Tooltip>
        </Container>
    )
}