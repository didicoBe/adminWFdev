import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "../src/components/paginas/login";
import Dash from "../src/components/paginas/dash";
import ConfigUser from "../src/components/paginas/configUser";
import Orcamento from "../src/components/paginas/orcamento";
import NovoOrcamento from "../src/components/paginas/orcamento/novo";

const Routes = ()=>(
    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/dash" component={Dash}></Route>
                <Route exact path="/configuser" component={ConfigUser}></Route>
                <Route exact path="/orcamento" component={Orcamento}></Route>
                <Route exact path="/novoorcamento" component={NovoOrcamento}></Route>
            </Switch>
        </BrowserRouter>
    </div>
);



export default Routes;
