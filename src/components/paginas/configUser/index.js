import React, { Component } from 'react'
import {Container,Card, Row, Col  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer } from "react-toastify";





export default class ConfigUser extends Component {
    state ={
        logado: true,
        nome:''
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


    componentDidMount(){
        this.validaOnline()
    }



    render() {
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
                            <Row>
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__jackInTheBox">
                                        <Card.Body>
                                            <Card.Title>Meus dados</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Dados da minha conta</Card.Subtitle>
                                            <Card.Text>

                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__jackInTheBox">
                                        <Card.Body>
                                            <Card.Title>Criar novo usuario Admin</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Criar conta para acessar nossa area de admin</Card.Subtitle>
                                            <Card.Text>
                                                
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__jackInTheBox">
                                        <Card.Body>
                                            <Card.Title>Criar novo usuario Cliente</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Criar conta para acessar ter acesso</Card.Subtitle>
                                            <Card.Text>
                                                
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__jackInTheBox">
                                        <Card.Body>
                                            <Card.Title>Configurações de api</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">area para configurar nossa api interna</Card.Subtitle>
                                            <Card.Text>
                                                
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Container>
                </div>
            )
        }
    }
}
