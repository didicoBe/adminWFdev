import React, { Component } from 'react'
import {Container,Card, Button,Form, Col  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";
import { Link } from 'react-router-dom';



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faMailBulk, faIdCard,faMask, faScroll,faMobile, faIdBadge, faCalendar, faRoad, faSortNumericDown, faArchway,faCity, faFlag, faStreetView} from '@fortawesome/free-solid-svg-icons'

export default class Novocliente extends Component {
    state ={
        logado: true,
        nome:'',
        cnpj:'',
        nomeFantasia:'',
        razaoSocial:'',
        celular:'',
        nomeResponsavel:'',
        emailResponsavel:'',
        telefoneResponsavel:'',
        cpfResponsavel:'',
        dataNascimento:'',
        rua:'',
        numero:'',
        bairro:'',
        cidade:'',
        estado:'',
        cep:''
    }

    

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async onSubmit(e) {
        
        const dados = { 
            cnpj:this.state.cnpj,
            nomeFantasia:this.state.nomeFantasia,
            razaoSocial:this.state.razaoSocial,
            celular:this.state.celular,
            nomeResponsavel:this.state.nomeResponsavel,
            emailResponsavel:this.state.emailResponsavel,
            telefoneResponsavel:this.state.telefoneResponsavel,
            cpfResponsavel:this.state.cpfResponsavel,
            dataNascimento:this.state.dataNascimento,
            rua:this.state.rua,
            numero:this.state.numero,
            bairro:this.state.bairro,
            cidade:this.state.cidade,
            estado:this.state.estado,
            cep:this.state.cep
        }
       
        await api.post('http://wfdesenvolvimento.com.br/api/cliente', dados)
            .then(response => {
                this.setState({
                    cnpj:'',
                    nomeFantasia:'',
                    razaoSocial:'',
                    celular:'',
                    nomeResponsavel:'',
                    emailResponsavel:'',
                    telefoneResponsavel:'',
                    cpfResponsavel:'',
                    dataNascimento:'',
                    rua:'',
                    numero:'',
                    bairro:'',
                    cidade:'',
                    estado:'',
                    cep:''
                })
                toast.success('😁 Cliente cadastrado com sucesso !', {
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
                                <div className='titulos'>Cadastrar novo cliente</div>
                                <div>
                                    <Link to="/clientes">
                                        <Button className="btn-wf float-right">voltar</Button>
                                    </Link>                                    
                                </div>
                            </div>
                            
                            <Card className="cartaoorcamento">
                                <Form>
                                    <h5 style={{marginTop:20}}>Dados da empresa</h5>
                                    <hr/>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><FontAwesomeIcon icon={faIdCard} color="#7b347f" style={{marginRight:10}}/>CNPJ</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="cnpj" id="cnpj" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label><FontAwesomeIcon icon={faMask} color="#7b347f" style={{marginRight:10}}/>Nome Fantasia</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="nomeFantasia" id="nomeFantasia" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label><FontAwesomeIcon icon={faScroll} color="#7b347f" style={{marginRight:10}}/>Razao Social</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="razaoSocial" id="razaoSocial" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                    </Form.Row>


                                    <h5 style={{marginTop:20}}>Dados do responsavel</h5>
                                    <hr/>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label><FontAwesomeIcon icon={faIdCard} color="#7b347f" style={{marginRight:10}}/>Nome Responsavel</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="nomeResponsavel" id="nomeResponsavel" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><FontAwesomeIcon icon={faPhoneAlt} color="#7b347f" style={{marginRight:10}}/>Telefone Responsavel</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="telefoneResponsavel" id="telefoneResponsavel" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><FontAwesomeIcon icon={faMobile} color="#7b347f" style={{marginRight:10}}/>Celular</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="celular" id="celular" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>                                        
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label><FontAwesomeIcon icon={faMailBulk} color="#7b347f" style={{marginRight:10}}/>E-mail Responsavel</Form.Label>
                                            <Form.Control type="email" placeholder="Campo Obrigatorio*" name="emailResponsavel" id="emailResponsavel" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label><FontAwesomeIcon icon={faIdBadge} color="#7b347f" style={{marginRight:10}}/>Cpf Responsavel</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="cpfResponsavel" id="cpfResponsavel" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label><FontAwesomeIcon icon={faCalendar} color="#7b347f" style={{marginRight:10}}/>Data Nascimento</Form.Label>
                                            <Form.Control type="date" placeholder="Campo Obrigatorio*" name="dataNascimento" id="dataNascimento" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                    </Form.Row>


                                    <h5 style={{marginTop:20}}>Dados do responsavel</h5>
                                    <hr/>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><FontAwesomeIcon icon={faRoad} color="#7b347f" style={{marginRight:10}}/>rua</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="rua" id="rua" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label><FontAwesomeIcon icon={faSortNumericDown} color="#7b347f" style={{marginRight:10}}/>Numero</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="numero" id="numero" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label><FontAwesomeIcon icon={faArchway} color="#7b347f" style={{marginRight:10}}/>Bairro</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="bairro" id="bairro" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><FontAwesomeIcon icon={faCity} color="#7b347f" style={{marginRight:10}}/>Cidade</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="cidade" id="cidade" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label><FontAwesomeIcon icon={faFlag} color="#7b347f" style={{marginRight:10}}/>Estado</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="estado" id="estado" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label><FontAwesomeIcon icon={faStreetView} color="#7b347f" style={{marginRight:10}}/>cep</Form.Label>
                                            <Form.Control type="text" placeholder="Campo Obrigatorio*" name="cep" id="cep" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                    </Form.Row>
                                    <Button className="btn-wf" onClick={()=>this.onSubmit()}>
                                        Salvar
                                    </Button>
                                </Form>
                            </Card>

                        </Card>
                    </Container>
                </div>
            )
        }
    }
}
