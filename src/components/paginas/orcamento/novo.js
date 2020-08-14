import React, { Component } from 'react'
import {Container,Card,Form, Col, Button  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMailBulk, faPoll,faIdCard} from '@fortawesome/free-solid-svg-icons'
import { faServicestack,faCreativeCommonsShare } from '@fortawesome/free-brands-svg-icons'

export default class NovoOrcamento extends Component {
    state ={
        logado: true,
        nome:'',
        nomeCli:'',
        telefone:'',
        mail:'',
        tiposerv:'',
        tipodev:'',
        ctt:'',
        conhece:'cadastro admin'
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async onSubmit(e) {
        
        const dados = { 
                        nome: this.state.nomeCli,
                        telefone: this.state.telefone,
                        email: this.state.mail,
                        tiposervico: this.state.tiposerv,
                        tipodev: this.state.tipodev,
                        prefctt: this.state.ctt,
                        comonosconheceu: this.state.conhece
        }
       
        await api.post('http://wfdesenvolvimento.com.br/api/orcamento', dados)
            .then(response => {
                this.setState({
                    nomeCli:'',
                    telefone:'',
                    mail:'',
                    tiposerv:'',
                    tipodev:'',
                    ctt:'',
                    conhece:''
                })
                toast.success('😁 Orçamento enviado com sucesso!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

            })
            .catch(error => {
                toast.error('🥺 Erro ao enviar, veja se preencheu todos os campos obrigatórios!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                console.error('aqui', error);
            });


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
                            <div className="titulos">Cadastro de novo Orçamento</div>
                            <div>
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><FontAwesomeIcon icon={faIdCard} color="#7b347f" style={{marginRight:10}}/>Nome</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="nomeCli" id="nomeCli" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label><FontAwesomeIcon icon={faPhone} color="#7b347f" style={{marginRight:10}}/>Telefone</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="telefone" id="telefone" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label><FontAwesomeIcon icon={faMailBulk} color="#7b347f" style={{marginRight:10}}/>E-mail</Form.Label>
                                            <Form.Control type="email" placeholder="Campo Obrigatorio*" name="mail" id="mail" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Label><FontAwesomeIcon icon={faPoll} color="#7b347f" style={{marginRight:10}}/>Selecione o tipo de serviço</Form.Label>
                                            <Form.Control as="select" name="tiposerv" id="tiposerv" onChange={(e)=>this.onChange(e)} >
                                                <option>Campo Obrigatorio* </option>
                                                <option>Aplicativo Mobile</option>
                                                <option>Site institucional/landpage</option>
                                                <option>Loja Virtual</option>
                                                <option>Software/Integração</option>
                                                <option>Outros</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label><FontAwesomeIcon icon={faServicestack} color="#7b347f" style={{marginRight:10}}/>Selecione o tipo de desenvolvimento</Form.Label>
                                            <Form.Control as="select"  name="tipodev" id="tipodev" onChange={(e)=>this.onChange(e)} >
                                                <option>Campo Obrigatorio*</option>
                                                <option>Criação do zero</option>
                                                <option>Manutenção e Ajustes</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label><FontAwesomeIcon icon={faCreativeCommonsShare} color="#7b347f" style={{marginRight:10}}/>Preferencia de contato</Form.Label>
                                            <Form.Control as="select"  name="ctt" id="ctt" onChange={(e)=>this.onChange(e)} >
                                                <option>Campo Obrigatorio*</option>
                                                <option>Telefone</option>
                                                <option>E-mail</option>
                                                <option>Whatsapp</option>
                                            </Form.Control>
                                        </Form.Group>

                                        
                                    </Form.Row>

                                   
                                    <Button className="btn-wf" onClick={()=>this.onSubmit()}>
                                        Salvar
                                    </Button>
                                </Form>                                     
                            </div>
                        </Card>
                    </Container>
                </div>
            )
        }
    }
}
