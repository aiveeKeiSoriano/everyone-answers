
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newSession, submitStatus } from '../actions/sessionActions';

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
    padding: 1em;

    .submit {
        display: flex;
        gap: 1em;
        align-items: center;
    }
`

export default function EnterNames() {

    let status = useSelector(state => state.session.submitStatus)
    let dispatch = useDispatch()
    let input = useRef()

    let submitNames = () => {
        dispatch(submitStatus("Submitting..."))
        let list = input.current.value.split(/[\n]|[,]/).map(word => word.trim()).filter(el => el !== '').sort()
        if (list.length === 0 || !list.every((el, i, arr) => el !== arr[i - 1])) {
            alert("Please make sure the list doesn't have duplicate names or empty")
            dispatch(submitStatus(""))
        }
        else {
            dispatch(newSession(list))
        }
    }

    return (
        <Container>
            <Typography variant='h3'>My Students</Typography>
            <Typography variant='body1'>Enter the names of each person who will answer your questions, separated by comma or new line.</Typography>
            <TextField
            inputRef={input}
            id="outlined-textarea"
            placeholder="e.g. Aivee, Sarah, Mike"
            multiline
            variant="outlined"
            rows={10}
            style={{width: '100%'}}
            />
            <div className="submit">
                <Button onClick={submitNames} variant="contained" color="primary">Submit</Button>
                <Typography variant="body1">{status}</Typography>
            </div>
        </Container>
    )
}