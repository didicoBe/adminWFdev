import React, { Component } from 'react'
import {Container,Card,Button, Row, Col  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";
import { Link } from 'react-router-dom';

export default class Visualizarcliente extends Component {
    state ={
        logado: true,
        nome:'',
        id:'',
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
            resposta = api.get('/login/'+login+'/'+token).then(response=>{
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

    pegadadosCliente = (id)=>{
        var resposta = false
        resposta = api.get('/cliente/'+id).then(response=>{
            this.setState({
                data:response.data[0]
            })
            return  true
        }).catch((erro)=>{
            return false
        })
    }


    componentDidMount(){
        const id  = this.props.match.params.id
        this.setState({
            id:id
        })
        this.validaOnline()
        this.pegadadosCliente(id)
    }



    render() {
        console.log(this.state.data)
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
                            <div style={{display:'flex', justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                <div className='titulos'>Dados cliente: {this.state.data.nomeFantasia}</div>
                                <div>
                                    <Link to="/clientes">
                                        <Button className="btn-wf float-right">voltar</Button>
                                    </Link>
                                   
                                </div>
                            </div>
                            <Row>
                                <Col md={3}>
                                    <Card className="cartaoorcamento col">
                                        <div>Dados principais</div>

                                    </Card>
                                </Col>
                                <Col md={9}>
                                    <Card className="cartaoorcamento col">
                                        <div>Dados complementares</div>
                                    </Card>
                                </Col>
                            </Row>
                            <hr/>
                            <div style={{display:'flex', justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                <div className='titulos'>Projetos</div>
                                <div>
                                    <Link to="/clientes">
                                        <Button className="btn-wf float-right">Cadastrar novo projeto</Button>
                                    </Link>
                                   
                                </div>
                            </div>
                            <Row>
                                
                            </Row>
                            
                        </Card>
                    </Container>
                </div>
            )
        }
    }
}
