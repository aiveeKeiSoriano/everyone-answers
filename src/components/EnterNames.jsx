
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
    padding: 1em;
`

export default function EnterNames() {
    return (
        <Container>
            <Typography variant='h3'>My Students</Typography>
            <Typography variant='body1'>Enter the names of each person who will answer your questions, separated by comma or new line.</Typography>
            <TextField
            id="outlined-textarea"
            placeholder="e.g. Aivee, Sarah, Mike"
            multiline
            variant="outlined"
            rows={10}
            style={{width: '100%'}}
            />
            <Button variant="contained" color="primary">Submit</Button>
        </Container>
    )
}