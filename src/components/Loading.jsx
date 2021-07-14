
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import { LinearProgress } from '@material-ui/core';

const Loading = styled.div`
    width: 800px;
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-self: center;
`

export default function LoadingPage() {
    return (
        <Loading>
            <Typography variant="h4">Loading...</Typography>
            <LinearProgress />
        </Loading>
    )
}