
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import HomeView from "../views/HomeView";
import TakeOffScreen from "../views/TakeOffScreen";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomeView} />
                <Route exact path="/home" component={HomeView} />
                <Route exact path="/takesout" component={TakeOffScreen} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
