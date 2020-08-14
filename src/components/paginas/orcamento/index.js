import React, { Component } from 'react'
import {Container, Button, Card  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";


//tabelas
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
//fim tabelas


import "./style.css"



export default class Orcamento extends Component {
    state ={
        logado: true,
        nome:'',
        data:[]
    }


    validaOnline = ()=>{
        const login = localStorage.getItem('login');
        const token = localStorage.getItem('token');
        const nome = localStorage.getItem('nome');

        var resposta = false
        if(login === null || token === null){
            this.setState({
                logado: false,
                nome:''
            })
            return resposta
        }else{
            resposta = api.get('/login/valida/'+login+'/'+token).then(response=>{
                this.setState({
                    logado: true,
                    nome:nome
                })
                return  true
            }).catch((erro)=>{
                this.setState({
                    logado: false,
                    nome:''
                })
                return false
            })
    
            return resposta
            
        }
    }


    pegadadosOrcamento = ()=>{
        var resposta = false
        resposta = api.get('/orcamento').then(response=>{
            this.setState({
                data:response.data
            })
            return  true
        }).catch((erro)=>{
            return false
        })
    }



    componentDidMount(){
        this.validaOnline()
        this.pegadadosOrcamento()
    }


    abrepagina = (id)=>{
        return(
            this.props.history.push('/orcamento/visualizar/'+id)
        )
    }


    render() {
        // dados e colunas da tabela
        const data = this.state.data
        const colunas = [{
            Header: 'Nome',
            accessor: 'nome' // String-based value accessors!
        }, {
            Header: 'Telefone',
            accessor: 'telefone',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'E-mail',
            accessor: 'email'
        }, {
            Header: 'Tipo de serviço', 
            accessor: 'tiposervico'
        },{
            Header: 'Tipo de Dev', 
            accessor: 'tipodev'
        }, {
            Header: 'Visualizar', 
            accessor:'id',
            Cell:  props  => (
                <Button 
                    variant="secondary" 
                    value={props.value} 
                    onClick={()=>{this.abrepagina(props.value)}} 
                    style={{marginLeft:'20px'}}
                >
                  Visualizar
                </Button>
              )
        }]


        if(this.state.logado === false){
            this.props.history.push('/')
            return null
        }else{
            return (
                <div style={{marginTop:'66px', display:'flex'}}>
                    <ToastContainer/>
                    <Topo
                        nome={this.state.nome}
                    />
                    <SideBar/>
                    <Container fluid>
                        <Card className="cartaoorcamento">
                            <h5 className="titulos">Orçamentos recebidos pelo site</h5>
                            <ReactTable
                                data={data}
                                columns={colunas}
                                defaultPageSize={10}
                                previousText='Anterior'
                                nextText='Próximo'
                                pageText="página"
                                rowsText="linhas"
                                filterable
                                defaultFilterMethod={(filter, row, column) => {
                                    const id = filter.pivotId || filter.id;
                                    if (typeof filter.value === "object") {
                                    return row[id] !== undefined
                                        ? filter.value.indexOf(row[id]) > -1
                                        : true;
                                    } else {
                                    return row[id] !== undefined
                                        ? String(row[id]).indexOf(filter.value) > -1
                                        : true;
                                    }
                                }}
                                className="-striped -highlight"
                            />
                        </Card>
                        
                    </Container>
                </div>
            )
        }
    }
}
