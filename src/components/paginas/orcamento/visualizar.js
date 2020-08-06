import React, { Component } from 'react'
import {Container, Col, Row, Card, Button,Form  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMailBulk, faPoll,faIdCard} from '@fortawesome/free-solid-svg-icons'
import { faServicestack,faCreativeCommonsShare } from '@fortawesome/free-brands-svg-icons'


export default class OrcamentoVisualizar extends Component {
    state ={
        logado: true,
        nome:'',
        id:'',
        data:[],
        historico:[],
        mensagem:'',
        status:''
    }

    //verifica se esta online se nao manda pra login
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

    //pega dados do orcamento
    pegaDadosId = async(id)=>{
        await api.get('/orcamento/'+id).then(response=>{
            this.setState({
                data:response.data[0]
            })
            return  true
        }).catch((erro)=>{
            return false
        })
    }

    //pega historico do orcamento
    pegaHistorico = async (id)=>{
        await api.get('/historico/'+id).then(response=>{
            this.setState({
                historico:response.data
            })
            return  true
        }).catch((erro)=>{
            return false
        })
    }



    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //add novo historico
    addNovoHistorico = async(e,id)=>{
        e.preventDefault()
        const dados = { 
            idOrcamento: id,
            mensagem: this.state.mensagem,
            usuario: this.state.nome,
            status: this.state.status,           
        }


        await api.post('/historico', dados).then(response=>{
            this.pegaDadosId(id)
            this.pegaHistorico(id)
            this.setState({
                mensagem:'',
                status:''
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

    //qndo o componente estiver pronto executa
    componentDidMount(){
        this.validaOnline()

        const id  = this.props.match.params.id
        this.pegaHistorico(id)
        this.pegaDadosId(id)
        
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
                            
                            <div style={{display:'flex',justifyContent:'space-between', alignItems:'center',marginBottom:'25px'}}>
                                <h5 className="titulos">Visualizar dados cliente: <span style={{fontWeight:"800",textTransform:'capitalize'}}>{this.state.data.nome}</span> </h5>
                                <h6>Status: <span style={{fontWeight:"300"}}>{this.state.data.status}</span></h6>
                            </div>
                        
                            <Row>
                                <Col md={4}>
                                    <h6 >Dados do cliente</h6>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title style={{textTransform:'capitalize'}}>{this.state.data.nome}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted" style={{marginTop:15}}>
                                                <div>
                                                    <FontAwesomeIcon icon={faPhone} color="#7b347f" style={{marginRight:20}}/> 
                                                    {this.state.data.telefone}
                                                </div>
                                                <div style={{marginTop:10}}>
                                                    <FontAwesomeIcon icon={faMailBulk} color="#7b347f" style={{marginRight:20}}/> 
                                                    {this.state.data.email}     
                                                </div>
                                                
                                            </Card.Subtitle>
                                            <Card.Text>
                                               
                                            </Card.Text>
                                            <Card.Link href={"tel:"+this.state.data.telefone} ><Button className="btn-wf">Ligar</Button></Card.Link>
                                            <Card.Link href={"mailto:"+this.state.data.email+"?subject=Contato direto site WF Desenvolvimento"}><Button className="btn-wf">enviar email</Button></Card.Link>
                                            <hr/>
                                            <h6 style={{marginTop:'15px'}}>Dados Orçamento</h6>


                                            <div style={{textTransform:'capitalize'}}>
                                                <FontAwesomeIcon icon={faPoll} color="#7b347f" style={{marginRight:10}}/> 
                                                <span style={{fontWeight:"800"}}>Tipo:.</span> {this.state.data.tiposervico}
                                            </div>
                                            <div style={{textTransform:'capitalize'}}>
                                                <FontAwesomeIcon icon={faServicestack} color="#7b347f" style={{marginRight:10}}/> 
                                                <span style={{fontWeight:"800"}}>Modelo:.</span> {this.state.data.tipodev}
                                            </div>
                                            <div style={{textTransform:'capitalize'}}>
                                                <FontAwesomeIcon icon={faIdCard} color="#7b347f" style={{marginRight:10}}/> 
                                                <span style={{fontWeight:"800"}}>Pref.Ctt:.</span> {this.state.data.prefctt}
                                            </div>
                                            <div style={{textTransform:'capitalize'}}>
                                                <FontAwesomeIcon icon={faCreativeCommonsShare} color="#7b347f" style={{marginRight:10}}/> 
                                                <span style={{fontWeight:"800"}}>Encontro Wf:.</span> {this.state.data.comonosconheceu}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <h6 >Historico</h6>
                                    <div className="basehistoricoOrcamento">

                                        {
                                             this.state.historico.map((resultado)=>{
                                                var data = new Date(resultado.data)
                                                return(
                                                    <div className="historicoOrcamento" key={resultado.id}>
                                                    <Card>
                                                        <Card.Header style={{color:'#fff',backgroundColor:'#495057',textAlign:'right', fontSize:12}}>
                                                                <div>Status {resultado.status}</div>
                                                                <div>Data:. {data.toLocaleDateString()}</div>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Card.Title>Ocorrência</Card.Title>
                                                            <Card.Text>
                                                                {resultado.mensagem}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                    </div>
                                                )
                                            })
                                        }

                                        
                                    </div>
                                    
                                    
                                </Col>
                            </Row>

                        </Card>

                        <Card className="cartaoorcamento">
                            <h5>Adicionar novo histórico</h5>
                            <Col md={4} style={{borderRight:"1px solid #ced4da"}}>
                                <Form>
                                   <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Selecione o novo status </Form.Label>
                                        <Form.Control as="select" name="status" onChange={(e)=>this.onChange(e)}>
                                            <option>aguardando contato</option>
                                            <option>sem contato com cliente</option>
                                            <option>Orçamento enviado</option>
                                            <option>Orçamento aprovado</option>
                                            <option>Orçamento não aprovado</option>                                            
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Escreva a nova ocorrência</Form.Label>
                                        <Form.Control as="textarea" rows="3" name="mensagem" value={this.state.mensagem} onChange={(e)=>this.onChange(e)} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={(e)=>this.addNovoHistorico(e,this.state.data.id)}>
                                        Enviar
                                    </Button>
                                </Form>
                            </Col>
                        </Card>
                    </Container>
                </div>
            )
        }
    }
}
