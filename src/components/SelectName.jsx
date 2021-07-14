
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { proceedAnswer, studentSelected } from '../actions/studentActions';
import { Button } from '@material-ui/core';

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2em;
    padding: 3em 1em 1em 1em;
`

export default function StudentPage() {

    let students = useSelector(state => state.student.list)
    let name = useSelector(state => state.student.name)
    let dispatch = useDispatch()

    return (
        <Container>
            <Typography variant="h4">Select Your Name</Typography>
            <FormControl style={{minWidth: "400px"}}>
                <Select
                    value={name}
                    onChange={(e) => dispatch(studentSelected(e.target.value))}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {students.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)}
                </Select>
            </FormControl>
            <Button onClick={() => dispatch(proceedAnswer())} color="primary" variant="contained">Continue</Button>
        </Container>
    )
}