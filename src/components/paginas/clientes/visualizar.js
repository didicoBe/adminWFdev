import React, { Component } from 'react'
import {Container,Card,Button, Row, Col, Form, ListGroup } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";
import { Link } from 'react-router-dom';


import './style.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMailBulk, faMobileAlt,faCalendarAlt, faSortNumericDown,faPhoneAlt, faIdCard,faMask, faScroll,faMobile, faIdBadge, faCalendar, faRoad, faArchway,faCity, faFlag, faStreetView} from '@fortawesome/free-solid-svg-icons'
import { faServicestack,faCreativeCommonsShare } from '@fortawesome/free-brands-svg-icons'




export default class Visualizarcliente extends Component {
    state ={
        logado: true,
        nome:'',
        id:'',
        data:[],
        projetos:[]
    }

    pegaProjetos = (idcliente)=>{
        api.get('/projeto/'+idcliente).then(response=>{
            this.setState({
                projetos:response.data
            })
           
        }).catch((erro)=>{
           console.log("erro ao pegar projetos")
        })
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

    abrepagina = (id)=>{
        return(
            this.props.history.push('/projeto/visualizar/'+id)
        )
    }

    componentDidMount(){
        const id  = this.props.match.params.id
        this.setState({
            id:id
        })
        this.validaOnline()
        this.pegadadosCliente(id)
        this.pegaProjetos(id)
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
                                        <Card.Title style={{textTransform:'capitalize'}}>{this.state.data.nomeResponsavel}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted" style={{marginTop:15}}>
                                                <div>
                                                    <FontAwesomeIcon icon={faMobileAlt} color="#7b347f" style={{marginRight:20}}/> 
                                                    {this.state.data.celular}
                                                </div>
                                                <div style={{marginTop:10}}>
                                                    <FontAwesomeIcon icon={faPhone} color="#7b347f" style={{marginRight:20}}/> 
                                                    {this.state.data.telefoneResponsavel}
                                                </div>
                                                <div style={{marginTop:10}}>
                                                    <FontAwesomeIcon icon={faCalendarAlt} color="#7b347f" style={{marginRight:20}}/> 
                                                    {this.state.data.dataNascimento}     
                                                </div>
                                                <div style={{marginTop:10}}>
                                                    <FontAwesomeIcon icon={faSortNumericDown} color="#7b347f" style={{marginRight:20}}/> 
                                                    {this.state.data.cpfResponsavel}
                                                </div>
                                            </Card.Subtitle>
                                        <Card/>

                                    </Card>
                                </Col>
                                <Col md={9}>
                                    <Card className="cartaoorcamento col">
                                        <div>Dados complementares</div>
                                        <hr/>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridEmail" className="bordaWf">
                                                <Form.Label><FontAwesomeIcon icon={faIdCard} color="#7b347f" style={{marginRight:10}}/>CNPJ</Form.Label>
                                                <div style={{marginLeft:10}}>{this.state.data.cnpj}</div>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridPassword"  className="bordaWf">
                                                <Form.Label><FontAwesomeIcon icon={faMask} color="#7b347f" style={{marginRight:10}}/>Nome Fantasia</Form.Label>
                                                <div style={{marginLeft:10}}>{this.state.data.nomeFantasia}</div>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridPassword"  className="bordaWf">
                                                <Form.Label><FontAwesomeIcon icon={faScroll} color="#7b347f" style={{marginRight:10}}/>Razao Social</Form.Label>
                                                <div style={{marginLeft:10}}>{this.state.data.razaoSocial}</div>
                                            </Form.Group>
                                        </Form.Row>
                                        <div>Dados endereço</div>
                                        <hr/>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridEmail"  className="bordaWf">
                                                <Form.Label><FontAwesomeIcon icon={faRoad} color="#7b347f" style={{marginRight:10}}/>Rua</Form.Label>
                                                <div style={{marginLeft:10}}>{this.state.data.rua}</div>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridPassword"  className="bordaWf">
                                                <Form.Label><FontAwesomeIcon icon={faSortNumericDown} color="#7b347f" style={{marginRight:10}}/>Numero</Form.Label>
                                                <div style={{marginLeft:10}}>{this.state.data.numero}</div>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridPassword"  className="bordaWf">
                                                <Form.Label><FontAwesomeIcon icon={faArchway} color="#7b347f" style={{marginRight:10}}/>Bairro</Form.Label>
                                                <div style={{marginLeft:10}}>{this.state.data.bairro}</div>
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridEmail"  className="bordaWf">
                                                <Form.Label><FontAwesomeIcon icon={faCity} color="#7b347f" style={{marginRight:10}}/>Cidade</Form.Label>
                                                <div style={{marginLeft:10}}>{this.state.data.cidade}</div>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridPassword"  className="bordaWf">
                                                <Form.Label><FontAwesomeIcon icon={faFlag} color="#7b347f" style={{marginRight:10}}/>Estado</Form.Label>
                                                <div style={{marginLeft:10}}>{this.state.data.estado}</div>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridPassword"  className="bordaWf">
                                                <Form.Label><FontAwesomeIcon icon={faStreetView} color="#7b347f" style={{marginRight:10}}/>cep</Form.Label>
                                                <div style={{marginLeft:10}}>{this.state.data.cep}</div>
                                            </Form.Group>
                                        </Form.Row>
                                    </Card>
                                </Col>
                            </Row>
                            <hr/>
                            <div style={{display:'flex', justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                <div className='titulos'>Projetos</div>
                                <div>
                                    <Link to={"/projeto/" + this.state.data.id}>
                                        <Button className="btn-wf float-right">Cadastrar novo projeto</Button>
                                    </Link>
                                </div>
                            </div>
                            
                                <Card className="cartaoorcamento">
                                        <div style={{display:'flex',justifyContent:'space-between', fontWeight:'600', color:'#7b347f'}}>
                                            <div style={{width:150}}>Nome Projeto</div>
                                            <div style={{width:150}}>Status</div>
                                            <div style={{width:150}}>Data Entrega</div>
                                            <div style={{width:100}}>Visualizar</div>
                                        </div>
                                        

                                        <hr/>
                                        <ListGroup variant="flush">
                                            {this.state.projetos.map((resp)=>{
                                                return(
                                                <ListGroup.Item key={resp.id}>
                                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                                        <div style={{width:180}}>{resp.nome}</div>
                                                        <div style={{width:180}}>{resp.status}</div>
                                                        <div style={{width:180}}>{resp.dataEntrega}</div>
                                                        
                                                        <Button className="btn-wf" onClick={()=>this.abrepagina(resp.id)}>visualizar</Button>
                                                        
                                                        
                                                    </div>
                                                    
                                                </ListGroup.Item>)
                                            })}
                                        </ListGroup>
                                   
                                </Card>
                            
                            
                        </Card>
                    </Container>
                </div>
            )
        }
    }
}
