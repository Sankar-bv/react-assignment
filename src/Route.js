import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import App from './App';

const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path ="/:id" component={App} />
            </Switch>
        </Router>
    )
}

export default Routing;