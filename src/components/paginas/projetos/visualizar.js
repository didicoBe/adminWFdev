import React, { Component } from 'react'
import {Container,Card,Button, Row, Col,ProgressBar  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareUp, faLaptopCode} from '@fortawesome/free-solid-svg-icons'
import { faGoogleDrive, faGithub } from "@fortawesome/free-brands-svg-icons"

import './style.css'

export default class VisualizarProjeto extends Component {
    state ={
        logado: true,
        nome:'',
        idProj:'',
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

    pegadadosProjeto = (idProj)=>{
        var resposta = false
        resposta = api.get('/projeto/unico/'+idProj).then(response=>{
            this.setState({
                data:response.data[0]
            })
            return  true
        }).catch((erro)=>{
            return false
        })
    }


    componentDidMount(){
        this.validaOnline()
        const id  = this.props.match.params.id
        this.setState({
            idProj:id
        })
        this.pegadadosProjeto(id)
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
                                <div className='titulos'><span style={{fontWeight:500}}>Projeto: </span>{this.state.data.nome}</div>
                                <div>
                                    <Link to={"/clientes/" + this.state.data.idCliente}>
                                        <Button className="btn-wf float-right">voltar</Button>
                                    </Link>
                                </div>
                            </div>
                            <hr/>
                            <div style={{display:'flex', justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                <div><span style={{fontWeight:500}}>Data inicio:</span> {this.state.data.dataInicio}</div>
                                <div><span style={{fontWeight:500}}>Data entrega:</span> {this.state.data.dataEntrega}</div>
                            </div> 
                            <div>
                                <span style={{fontWeight:500}}>Status: </span>{this.state.data.status}
                            </div>                                       
                            <hr/>
                            <hr/>
                            <div style={{display:'flex', justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                <div><span style={{fontWeight:500}}>Forma de Pagamento:</span> {this.state.data.formaDePagamento}</div>
                                <div><span style={{fontWeight:500}}>Valor:</span> {this.state.data.valor}</div>
                            </div>                                        
                            <hr/>
                            <div style={{fontWeight:500}}>Progresso do projeto</div>
                            <ProgressBar now={20} label={`${20}%`} />
                            <hr/>
                            <Card style={{ marginTop:20 }}>
                                <Card.Body>
                                    <Card.Title>Sobre o projeto</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Visão geral</Card.Subtitle>
                                    <Card.Text>
                                        <hr/>
                                        
                                        {this.state.data.descritivo}
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                            <h6 style={{marginTop:15}}>Links Externos</h6>
                            <Row>
                                <Col md={3}>
                                    <a href={this.state.data.GoogleDrive} target="_blank" style={{textDecoration:'none'}} >
                                    <Card className="text-center cartaoExterno" >
                                        <Card.Body>
                                            <FontAwesomeIcon icon={faGoogleDrive}  style={{fontSize:60}}/>
                                            <div style={{fontWeight:500}}>Google drive</div>
                                        </Card.Body>
                                    </Card>
                                    </a>
                                </Col>
                                <Col md={3}>
                                    <a href={this.state.data.github} target="_blank" style={{textDecoration:'none'}} >
                                    <Card className="text-center cartaoExterno">
                                        <Card.Body>
                                            <FontAwesomeIcon icon={faGithub}  style={{fontSize:60}}/>
                                            <div style={{fontWeight:500}}>GitHub</div>
                                        </Card.Body>
                                    </Card>
                                    </a>
                                </Col>
                                <Col md={3}>
                                    <a href={this.state.data.vercel} target="_blank" style={{textDecoration:'none'}} >
                                    <Card className="text-center cartaoExterno">
                                        <Card.Body>
                                            <FontAwesomeIcon icon={faCaretSquareUp}  style={{fontSize:60}}/>
                                            <div style={{fontWeight:500}}>Vercel</div>
                                        </Card.Body>
                                    </Card>
                                    </a>
                                </Col>
                                <Col md={3}>
                                    <a href={this.state.data.GoogleDrive} target="_blank" style={{textDecoration:'none'}} >
                                    <Card className="text-center cartaoExterno">
                                        <Card.Body>
                                            <FontAwesomeIcon icon={faLaptopCode}  style={{fontSize:60}}/>
                                            <div style={{fontWeight:500}}>Url site</div>
                                        </Card.Body>
                                    </Card>
                                    </a>
                                </Col>
                            </Row>

                        </Card>
                    </Container>
                </div>
            )
        }
    }
}
