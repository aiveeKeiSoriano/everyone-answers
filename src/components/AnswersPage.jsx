
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import Typography from '@material-ui/core/Typography';
import { Grid, Button, Paper, makeStyles, IconButton, Tooltip } from '@material-ui/core';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { addNewStudent, clearAnswers, deleteSession, removeStudent, showAddInput, syncPrompt, updateStatus } from '../actions/sessionActions';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { useEffect, useRef } from 'react';

const Container = styled.div`
    width: 100%;
    max-width: 1000px;
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    margin-bottom: 2em;
    padding: 0em 1em;

    a {
        color: rgb(63,81,181);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

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

    .top {
        position: relative;
        display: flex;
        justify-content: space-between;
    }

    .delete {
        position: absolute;
        bottom: 0;
        right: 0;
        display: none;
    }

    &:hover .delete {
        display: block;
    }

    ${props => props.add && css`
        .box {
            background-color: #3f51b5ca;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 150px;
            border: 2px solid transparent;

            &:hover {
                background-color: #3f51b5;
            }

            .addButton {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
        }
    `}
`

const EndSession = styled.div`
    display: flex;
    gap: 1em;
    align-items: center;
`

const Divide = styled.div`
    display: flex;
    align-items: center;
    gap: .5em;

    hr {
        flex: 1;
        border: none;
        background-color: #c0c0c0;
        height: 2px;
    }
`

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(0),
        paddingLeft: theme.spacing(2),
        display: "flex",
        gap: theme.spacing(1),
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#eeeeee"
    },
    prompt: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgb(63,81,181)',
                borderWidth: 2,
            }
        }
    }
}));

export default function AnswersPage() {

    let classes = useStyles()

    let newStudent = useRef()
    let promptRef = useRef()

    let students = useSelector(state => state.session.students)
    let session = useSelector(state => state.session.sessionID)
    let status = useSelector(state => state.session.status)
    let addInput = useSelector(state => state.session.addInput)
    let dispatch = useDispatch()
    // let link = "https://optimistic-agnesi-f901f6.netlify.app/student/" + session
    let link = "http://localhost:3000/student/" + session

    let endSession = () => {
        let endConfirmation = window.confirm("The session will be deleted permanently. Do you want to proceed?")
        if (endConfirmation) {
            dispatch(updateStatus("Ending session..."))
            dispatch(deleteSession())
        }
    }

    let clear = () => {
        dispatch(updateStatus("Clearing answers..."))
        promptRef.current.value = ""
        dispatch(clearAnswers())
    }

    let prompt = (e) => {
        dispatch(updateStatus("Syncing..."))
        dispatch(syncPrompt(e.target.value))
    }

    let newStudentName = (e) => {
        if (e.key === "Enter") {
            dispatch(addNewStudent(newStudent.current.value))
            window.removeEventListener("keydown", escapePressed)
        }
    }

    let escapePressed = (e) => {
        if (e.key === "Escape") {
            dispatch(showAddInput(false))
            window.removeEventListener("keydown", escapePressed)
        }
    }

    useEffect(() => {
        if (addInput) {
            window.addEventListener("keydown", escapePressed)
        }
        else {
            newStudent.current.value = ""
        }
        // eslint-disable-next-line
    }, [addInput])

    return (
        <Container>
            <div className="header">
                <div className="left">
                    <Typography variant='h3'>Dashboard</Typography>
                    <Button onClick={clear} variant="contained" color="primary">Reset</Button>
                </div>
                <EndSession>
                    <Typography variant="body1">{status}</Typography>
                    <Button onClick={endSession} variant="contained">End Session</Button>
                </EndSession>
            </div>
            <Paper variant="outlined" className={classes.paper}>
                <Typography variant='body1'>Student Link: {link}</Typography>
                <Tooltip title="copy">
                    <IconButton onClick={() => { navigator.clipboard.writeText(link) }}>
                        <AssignmentOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
            <TextField
                inputRef={promptRef}
                className={classes.prompt}
                onChange={prompt}
                id="outlined-textarea"
                multiline
                rows={2}
                maxRows={10}
                variant="outlined"
                label="Teacher's Prompt"
            />
            <Divide><hr /><Typography variant='caption' color="textSecondary">Students Answers</Typography><hr /></Divide>
            <Grid container justifyContent="flex-start" spacing={2}>
                {students.map((value) => (
                    <Grid key={value.name} item xs={4}>
                        <Box>
                            <div className="top">
                                <Typography variant="subtitle2" color="primary">{value.name}</Typography>
                                <div className="delete">
                                    <IconButton onClick={() => dispatch(removeStudent(value.name))} size="small">
                                        <DeleteIcon fontSize="small" style={{ color: "#ff3737" }} />
                                    </IconButton>
                                </div>
                            </div>
                            <div className="box">
                                {value.answer.map(el => <Typography variant="body1">{el}</Typography>)}
                            </div>
                        </Box>
                    </Grid>
                ))}
                <Grid key={"newStudent"} item xs={4} style={addInput ? { display: "block" } : { display: "none" }}>
                    <Box>
                        <TextField
                            onKeyDown={newStudentName}
                            inputRef={newStudent}
                            placeholder="New Student"
                            helperText="Press enter to save, esc to cancel"
                        />
                        <div className="box">

                        </div>
                    </Box>
                </Grid>
                <Grid key={"addstudent"} item xs={4} style={addInput ? { display: "none" } : { display: "block" }}>
                    <Box add>
                        <Typography variant="subtitle2" style={{ color: "white" }}>Fill</Typography>
                        <div className="box">
                            <IconButton onClick={() => dispatch(showAddInput(true))} size="small">
                                <div className="addButton">
                                    <AddIcon style={{ fontSize: 80, color: "white" }} />
                                    <Typography variant="button" style={{ color: "white" }}>Add New Student</Typography>
                                </div>
                            </IconButton>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}