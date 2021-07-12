
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Login from "./Login"
import styled from 'styled-components'
import { checkSignIn } from "../actions/authActions";
import { useEffect } from "react";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

export default function Main() {
    let user = useSelector(state => state.auth.user)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkSignIn())
        // eslint-disable-next-line
    }, [])
    // console.log(user)
    return (
        <Container>
            {user ?
                <Dashboard />
            : <Login />
        }
        </Container>
    )
}