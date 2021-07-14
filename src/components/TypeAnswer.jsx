
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { listenToReset, syncAnswer } from '../actions/studentActions';

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
    padding: 3em 1em 1em 1em;
`

export default function StudentPage() {

    let name = useSelector(state => state.student.selected)
    let status = useSelector(state => state.student.status)
    let reset = useSelector(state => state.student.reset)
    let dispatch = useDispatch()

    let input = useRef()

    useEffect(() => {
        if (reset) {
            input.current.value = ""
        }
    }, [reset])

    useEffect(() => {
        dispatch(listenToReset())
        // eslint-disable-next-line
    }, [])

    return (
        <Container>
            <Typography variant="body1">{name}</Typography>
            <Typography variant="h4">My Answer</Typography>
            <Typography variant="body1">Enter your answer below. This text is visible to the teacher.</Typography>
            <TextField
                inputRef={input}
                onChange={(e) => dispatch(syncAnswer(e.target.value))}
                id="outlined-textarea"
                multiline
                variant="outlined"
                rows={15}
                style={{ width: '100%' }}
            />
            <Typography variant="subtitle2" color="primary">{status}</Typography>
        </Container>
    )
}