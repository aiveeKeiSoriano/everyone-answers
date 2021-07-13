
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const Container = styled.div`
    width: 100%;
    max-width: 900px;
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: .5em;
    margin-bottom: 2em;

    a {
        color: rgb(63,81,181);
    }
`

const Box = styled.div`
    min-height: 180px;
    display: flex;
    flex-direction: column;
    gap: .3em;

    .box {
        border-radius: 5px;
        border: 2px solid rgb(63,81,181);
        flex: 1;
        padding: 1em;
    }
`

export default function AnswersPage() {
    let students = useSelector(state => state.session.students)
    let session = useSelector(state => state.session.sessionID)
    let link = "https://localhost:3000/student/" + session
    return (
        <Container>
            <Typography variant='h3'>Dashboard</Typography>
            <Typography variant='body1'>Student Link: <a href={link}>{link}</a></Typography>
            <Grid container justifyContent="flex-start" spacing={2}>
                {students.map((value) => (
                    <Grid key={value.name} item xs={4}>
                        <Box>
                            <Typography variant="subtitle2" color="primary">{value.name}</Typography>
                            <div className="box">
                                {value.answer}
                            </div>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}