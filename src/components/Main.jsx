
import { useDispatch, useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Dashboard from "./Dashboard";
import Login from "./Login"
import styled from 'styled-components'
import { checkSignIn } from "../actions/authActions";
import { useEffect } from "react";
import { LinearProgress } from "@material-ui/core";

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
                    : <Loading>
                        <Typography variant="h4">Loading...</Typography>
                        <LinearProgress />
                    </Loading>
        }
        </Container>
    )
}