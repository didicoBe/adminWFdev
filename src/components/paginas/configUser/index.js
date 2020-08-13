import React, { Component } from 'react'
import {Container,Card, Row, Col, Button,Tab, Nav  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer } from "react-toastify";

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCardAlt, faAddressCard, faIdCard,faLayerGroup, faCogs,faUserSecret} from '@fortawesome/free-solid-svg-icons'

import './style.css'



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
                            <div style={{display:'flex', justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                <div className='titulos'><span style={{fontWeight:500}}><FontAwesomeIcon icon={faCogs} color='#7b347f'  style={{fontSize:35}}/> Configurações </span></div>
                                <div>
                                    <Link to={"/dash"}>
                                        <Button className="btn-wf float-right">voltar</Button>
                                    </Link>
                                </div>
                            </div>
                            <hr/>
                            <Row>
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__fadeInDown cartaoExterno">
                                        <Card.Body>
                                            <Card.Title>Meus dados</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Dados da minha conta</Card.Subtitle>
                                            <Card.Text style={{textAlign:'center'}}>
                                                <FontAwesomeIcon icon={faIdCard}  style={{fontSize:120, marginTop:15}}/>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__fadeInDown  cartaoExterno">
                                        <Card.Body>
                                            <Card.Title>Criar novo usuario Admin</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Criar conta para acessar nossa area de admin</Card.Subtitle>
                                            <Card.Text style={{textAlign:'center'}}>
                                                <FontAwesomeIcon icon={faIdCardAlt}  style={{fontSize:120, marginTop:15}}/>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__fadeInDown  cartaoExterno">
                                        <Card.Body>
                                            <Card.Title>Criar novo usuario Cliente</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Criar conta para acessar ter acesso</Card.Subtitle>
                                             <Card.Text style={{textAlign:'center'}}>
                                                <FontAwesomeIcon icon={faAddressCard}  style={{fontSize:120, marginTop:15}}/>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__fadeInDown  cartaoExterno">
                                        <Card.Body>
                                            <Card.Title>Configurações de api</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">area para configurar nossa api interna</Card.Subtitle>
                                             <Card.Text style={{textAlign:'center'}}>
                                                <FontAwesomeIcon icon={faLayerGroup}  style={{fontSize:120, marginTop:15}}/>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                
                                <Col>
                                    
                                    <Card style={{ marginTop:20, padding:15 }} className="animate__animated  animate__fadeInDown  cartaoExterno">
                                    <div className='titulos'><span style={{fontWeight:500}}><FontAwesomeIcon icon={faUserSecret} color='#7b347f'  style={{fontSize:25}}/> Lista de usuarios </span></div>
                                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                            <Row>
                                                <Col sm={3}>
                                                    <Nav variant="pills" className="flex-column">
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="first">Usuarios Admin</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="second">Usuarios Clientes</Nav.Link>
                                                        </Nav.Item>
                                                    </Nav>
                                                </Col>
                                                <Col sm={9}>
                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="first">
                                                            a
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="second">
                                                            a
                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </Col>
                                            </Row>
                                        </Tab.Container>
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
