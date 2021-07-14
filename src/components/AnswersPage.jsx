
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import { Grid, Button } from '@material-ui/core';
import { clearAnswers, deleteSession, updateStatus } from '../actions/sessionActions';

const Container = styled.div`
    width: 100%;
    max-width: 900px;
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: .5em;
    margin-bottom: 2em;
    padding: 0em 1em;

    a {
        color: rgb(63,81,181);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            display: flex;
            gap: 1em;
            align-items: center;
        }
    }
`

const Box = styled.div`
    height: 100%;
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
    let link = "https://optimistic-agnesi-f901f6.netlify.app/student/" + session
    // let link = "http://localhost:3000/student/" + session

    let endSession = () => {
        let endConfirmation = window.confirm("The session will be deleted permanently. Do you want to proceed?")
        if (endConfirmation) {
            dispatch(updateStatus("Ending session..."))
            dispatch(deleteSession())
        }
    }

    let clear = () => {
        dispatch(updateStatus("Clearing answers..."))
        dispatch(clearAnswers())
    }

    return (
        <Container>
            <div className="header">
                <div className="left">
                    <Typography variant='h3'>Dashboard</Typography>
                    <Button onClick={clear} variant="contained" color="primary">Clear Answers</Button>
                </div>
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
                                {value.answer.map(el => <Typography variant="body1">{el}</Typography>)}
                            </div>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}