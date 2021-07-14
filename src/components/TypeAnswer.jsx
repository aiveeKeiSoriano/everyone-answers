
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';

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
    // let dispatch = useDispatch()

    return (
        <Container>
            <Typography variant="body1">{name}</Typography>
            <Typography variant="h4">My Answer</Typography>
            <Typography variant="body1">Enter your answer below. This text is visible to the teacher.</Typography>
            <TextField
                id="outlined-textarea"
                multiline
                variant="outlined"
                rows={10}
                style={{ width: '100%' }}
            />
        </Container>
    )
}