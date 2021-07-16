import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { authRef, uiConfig } from "../firebase-config";

const Container = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    padding: 3em 1em 1em 1em;

    img {
        width: 200px;
    }
`

export default function Login() {
    return (
        <Container>
            <Typography variant='h3'>Everyone Answers</Typography>
            <Typography variant='body1'>Welcome. Please sign in.</Typography>
            <AccountCircleIcon color='disabled' style={{ fontSize: 150 }} />
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authRef} />
        </Container>
    )
}