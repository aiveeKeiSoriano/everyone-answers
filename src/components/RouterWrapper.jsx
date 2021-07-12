import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import StudentPage from './StudentPage'
import Main from './Main'

export default function RouterWrapper() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Main />
                </Route>
                <Route path='/student/:id' component={StudentPage} />
            </Switch>
        </Router>
    )
}