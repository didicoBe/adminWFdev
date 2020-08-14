import React, { Component } from 'react'
import {Container,Card,Button, Row, Col,ProgressBar,Form  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareUp, faLaptopCode} from '@fortawesome/free-solid-svg-icons'
import { faGoogleDrive, faGithub } from "@fortawesome/free-brands-svg-icons"
import InputRange from 'react-input-range'

import './style.css'

export default class VisualizarProjeto extends Component {
    state ={
        logado: true,
        nome:'',
        idProj:'',
        data:[],
        statusPRojN:0,
        menssagem:'',
        status:'',
        historico:[]
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

    pegadadosProjeto = (idProj)=>{
        var resposta = false
        resposta = api.get('/projeto/unico/'+idProj).then(response=>{
            this.setState({
                data:response.data[0],
                statusPRojN:response.data[0].progresso,
                status: response.data[0].status
            })
            return  true
        }).catch((erro)=>{
            return false
        })
    }

    //mudar
    onChange(e) {
        if(e.target.value == 'Finalizado'){
            this.setState({
                statusPRojN:100
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    //updateProgresso
    updateProgresso = async()=>{
        const dados = { 
            id: this.state.idProj,
            progresso: this.state.statusPRojN,    
            status:this.state.status 
        }

        await api.put('/projeto', dados).then(response=>{
            
        }).catch((erro)=>{
            toast.error('🥺 Erro ao enviar, entre em contato com o suporte!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
        })
    }

    //add novo historico
    addNovoHistorico = async(e)=>{
        e.preventDefault()
        const dados = { 
            idProjeto: this.state.idProj,
            mensagem: this.state.mensagem,
            usuarioSis: this.state.nome,
            status: this.state.status,           
        }


        await api.post('/projeto-historico', dados).then(response=>{
            this.updateProgresso()
            this.pegaHistorico(this.state.idProj)
            this.setState({
                mensagem:'',
            })
            toast.success('😁 Historico Salvo com sucesso!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });

           
        }).catch((erro)=>{
            toast.error('🥺 Erro ao enviar, entre em contato com o suporte!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
        })



        





    }

    //pega historico do orcamento
    pegaHistorico = async (id)=>{
        await api.get('/projeto-historico/'+id).then(response=>{
            this.setState({
                historico:response.data
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
        this.pegaHistorico(id)
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
                                <span style={{fontWeight:500}}>Status: </span>{this.state.status}
                            </div>                                       
                            <hr/>
                            <hr/>
                            <div style={{display:'flex', justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                <div><span style={{fontWeight:500}}>Forma de Pagamento:</span> {this.state.data.formaDePagamento}</div>
                                <div><span style={{fontWeight:500}}>Valor:</span> {this.state.data.valor}</div>
                            </div>                                        
                            <hr/>
                            <div style={{fontWeight:500}}>Progresso do projeto</div>
                            <ProgressBar now={this.state.statusPRojN} label={`${this.state.statusPRojN}%`} />
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
                                    <a href={this.state.data.urlDominio} target="_blank" style={{textDecoration:'none'}} >
                                    <Card className="text-center cartaoExterno">
                                        <Card.Body>
                                            <FontAwesomeIcon icon={faLaptopCode}  style={{fontSize:60}}/>
                                            <div style={{fontWeight:500}}>Url site</div>
                                        </Card.Body>
                                    </Card>
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Card className="cartaoorcamento">
                                        <h5>Adicionar novo histórico</h5>
                                        <Col md={6} style={{borderRight:"1px solid #ced4da"}}>
                                            <Form>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Selecione o novo status do projeto </Form.Label>

                                                    <InputRange
                                                        maxValue={100}
                                                        minValue={0}
                                                        value={this.state.statusPRojN}
                                                        onChange={value => this.setState({ statusPRojN : value })}
                                                        
                                                    />
                                                    
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Selecione o novo status </Form.Label>
                                                    <Form.Control as="select" name="status" onChange={(e)=>this.onChange(e)}>
                                                        <option>Iniciado</option>
                                                        <option>Em Andamento</option>
                                                        <option>Finalizado</option>                                           
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Escreva a nova ocorrência</Form.Label>
                                                    <Form.Control as="textarea" rows="3" name="mensagem" value={this.state.mensagem} onChange={(e)=>this.onChange(e)} />
                                                </Form.Group>
                                                <Button className="btn-wf" type="submit" onClick={(e)=>this.addNovoHistorico(e)}>
                                                    Enviar
                                                </Button>
                                            </Form>
                                        </Col>
                                    </Card>
                                    
                                </Col>
                                <Col md={6}>
                                    <Card className="cartaoorcamento">
                                    <h6 >Historico</h6>
                                    <div className="basehistoricoOrcamento">

                                        {
                                            this.state.historico.map((resultado)=>{
                                                var data = new Date(resultado.data)
                                                return(
                                                    <div className="historicoOrcamento">
                                                    <Card>
                                                        <Card.Header style={{color:'#fff',backgroundColor:'#495057',textAlign:'right', fontSize:12}}>
                                                                <div>Data:.{data.toLocaleDateString()}</div>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Card.Title>Ocorrência</Card.Title>
                                                                {resultado.mensagem}
                                                            <Card.Text>
                                                                
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    </div>
                                                )
                                            })
                                        }

                                        
                                    </div>
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
