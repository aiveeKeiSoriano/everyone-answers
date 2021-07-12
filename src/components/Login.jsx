import { useDispatch } from "react-redux"
import { SignIn } from "../actions/authActions"
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import googleButton from '../images/btn_google_signin_light_pressed_web@2x.png'
import { Button } from "@material-ui/core";


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
    let dispatch = useDispatch()
    return (
        <Container>
            <Typography variant='h3'>Everyone Answers</Typography>
            <Typography variant='body1'>Welcome. Please sign in.</Typography>
            <AccountCircleIcon color='disabled' style={{ fontSize: 150}}/>
            <Button onClick={() => dispatch(SignIn())}>
                <img src={googleButton} alt="Sign in with google" />
            </Button>
        </Container>
    )
}