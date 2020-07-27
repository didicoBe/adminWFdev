import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "../src/components/paginas/login";
import Dash from "../src/components/paginas/dash";

const Routes = ()=>(
    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/dash" component={Dash}></Route>
            </Switch>
        </BrowserRouter>
    </div>
);



export default Routes;