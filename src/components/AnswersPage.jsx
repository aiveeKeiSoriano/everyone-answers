
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { Button } from "@material-ui/core";
import { deleteSession, updateStatus } from '../actions/sessionActions';

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

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
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

const EndSession = styled.div`
    display: flex;
    gap: 1em;
    align-items: center;
`

export default function AnswersPage() {
    let students = useSelector(state => state.session.students)
    let session = useSelector(state => state.session.sessionID)
    let status = useSelector(state => state.session.status)
    let dispatch = useDispatch()
    let link = "https://localhost:3000/student/" + session

    let endSession = () => {
        let endConfirmation = window.confirm("The session will be deleted permanently. Do you want to proceed?")
        if (endConfirmation) {
            dispatch(updateStatus("Ending session..."))
            dispatch(deleteSession())
        }
    }

    return (
        <Container>
            <div className="header">
                <Typography variant='h3'>Dashboard</Typography>
                <EndSession>
                    <Typography variant="body1">{status}</Typography>
                    <Button onClick={endSession} variant="contained">End Session</Button>
                </EndSession>
            </div>
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