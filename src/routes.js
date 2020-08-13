import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "../src/components/paginas/login";
import Dash from "../src/components/paginas/dash";
import ConfigUser from "../src/components/paginas/configUser";
import Orcamento from "../src/components/paginas/orcamento";
import NovoOrcamento from "../src/components/paginas/orcamento/novo";
import OrcamentoVisualizar from "../src/components/paginas/orcamento/visualizar";
import Clientes from "../src/components/paginas/clientes";
import Novocliente from "../src/components/paginas/clientes/novo";
import Visualizarcliente from "../src/components/paginas/clientes/visualizar";
import Projeto from "../src/components/paginas/projetos";
import VisualizarProjeto from "../src/components/paginas/projetos/visualizar";
import Suporte from "../src/components/paginas/suporte";

const Routes = () => (

    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/dash" component={Dash}></Route>
                <Route exact path="/configuser" component={ConfigUser}></Route>
                <Route exact path="/orcamento" component={Orcamento}></Route>
                <Route exact path="/novoorcamento" component={NovoOrcamento}></Route>
                <Route exact path="/orcamento/visualizar/:id" component={OrcamentoVisualizar}></Route>
                <Route exact path="/clientes" component={Clientes}></Route>
                <Route exact path="/clientes/:id" component={Visualizarcliente}></Route>
                <Route exact path="/novocliente" component={Novocliente}></Route>
                <Route exact path="/projeto/:idCliente" component={Projeto}></Route>
                <Route exact path="/projeto/visualizar/:id" component={VisualizarProjeto}></Route>
                <Route exact path="/suporte" component={Suporte}></Route>
            </Switch>
        </BrowserRouter>
    </div>

);



export default Routes;
