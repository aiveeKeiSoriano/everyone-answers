
import { useDispatch, useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Dashboard from "./Dashboard";
import Login from "./Login"
import styled from 'styled-components'
import { checkSignIn } from "../actions/authActions";
import { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Loading = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    gap: 1em;
`

export default function Main() {
    let logged = useSelector(state => state.auth.logged)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkSignIn())
        // eslint-disable-next-line
    }, [])
    return (
        <Container>
            {logged ?
                <Dashboard />
            : logged === false ?
                <Login />
            :   <Loading>
                        <CircularProgress size={60} thickness={4} />
                        <Typography variant="h4">Loading...</Typography>
                </Loading>
        }
        </Container>
    )
}