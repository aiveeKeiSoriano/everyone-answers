
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import { checkSignIn } from "../actions/authActions";
import Dashboard from "./Dashboard";
import Login from "./Login"
import LoadingPage from "./Loading";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
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
                    : <LoadingPage />
            }
        </Container>
    )
}