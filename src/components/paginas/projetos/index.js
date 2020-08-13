import React, { Component } from 'react'
import {Container,Card,Button,Col,Form  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";
import { Link } from 'react-router-dom';

export default class Projeto extends Component {
    state ={
        logado: true,
        nome:'',
        idCliente:'',
        logo:'',
        nomeprojeto:'',
        dataEntrega:'',
        descritivo:'',
        vercel:'',
        github:'',        
        GoogleDrive:'',
        formaDePagamento:'',
        valor:'',
        Url:''


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

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async onSubmit(e) {
        var idCli = this.state.idCliente
        const dados = { 
                idCliente:this.state.idCliente,
                logo:this.state.logo,
                nome:this.state.nomeprojeto,
                dataEntrega:this.state.dataEntrega,
                descritivo:this.state.descritivo,
                vercel:this.state.vercel,
                github:this.state.github,        
                GoogleDrive:this.state.GoogleDrive,
                formaDePagamento:this.state.formaDePagamento,
                valor:this.state.valor,
                urlDominio:this.state.Url
        }
       
        await api.post('http://wfdesenvolvimento.com.br/api/projeto', dados)
            .then(response => {
                this.setState({
                    idCliente:'',
                    logo:'',
                    nomeprojeto: '',
                    dataEntrega: '',
                    descritivo: '',
                    vercel: '',
                    github: '',        
                    GoogleDrive: '',
                    formaDePagamento: '',
                    valor: '',
                })
                toast.success('😁 Projeto salvo com sucesso!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                },
                this.props.history.push('/clientes/'+idCli));
                

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


    componentDidMount(){
        this.validaOnline()
        const id  = this.props.match.params.idCliente
        this.setState({
            idCliente:id
        })

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
                                <div className='titulos'>Cadastrar novo projeto.</div>
                                <div>
                                    <Link to={"/clientes/" + this.state.idCliente}>
                                        <Button className="btn-wf float-right">Voltar</Button>
                                    </Link>
                                </div>
                            </div>
                            <div style={{marginTop:25}}>
                                <Form>
                                    <Form.Row>

                                        <Form.Group as={Col} md={4}>
                                            <Form.File label="Logo" name="logo" id="logo" onChange={(e)=>this.onChange(e)} value={this.state.logo} />
                                        </Form.Group>

                                        <Form.Group as={Col} md={4} >
                                            <Form.Label>Nome do Projeto</Form.Label>
                                            <Form.Control type="text" placeholder="Nome do projeto"  name="nomeprojeto" id="nomeprojeto" onChange={(e)=>this.onChange(e)} value={this.state.nomeprojeto}  />
                                        </Form.Group>
                                        

                                        <Form.Group as={Col} md={4}>
                                            <Form.Label>Data de entrega</Form.Label>
                                            <Form.Control type="date" placeholder="data de entrega" name="dataEntrega" id="dataEntrega" onChange={(e)=>this.onChange(e)} value={this.state.dataEntrega} />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Group >
                                        <Form.Label>Descritivo</Form.Label>
                                        <Form.Control as="textarea" rows="4" name="descritivo" id="descritivo" onChange={(e)=>this.onChange(e)} value={this.state.descritivo} />
                                    </Form.Group>


                                    <Form.Row>
                                        <Form.Group as={Col} md={4} >
                                            <Form.Label>Valor</Form.Label>
                                            <Form.Control type="number" name="valor" id="valor" onChange={(e)=>this.onChange(e)} value={this.state.valor}  />
                                        </Form.Group>
                                        <Form.Group as={Col} md={4}>
                                            <Form.Label>Tipo de pagamento</Form.Label>
                                            <Form.Control as="select" name="formaDePagamento" id="formaDePagamento" onChange={(e)=>this.onChange(e)} value={this.state.formaDePagamento} >
                                                <option>50% / 50%</option>
                                                <option>Avista 10% desc</option>
                                                <option>Cartão de credito</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md={3} >
                                            <Form.Label>Vercel Url</Form.Label>
                                            <Form.Control name="vercel" id="vercel" onChange={(e)=>this.onChange(e)} value={this.state.vercel}   />
                                        </Form.Group>

                                        <Form.Group as={Col} md={3} >
                                            <Form.Label>Github Url</Form.Label>
                                            <Form.Control  name="github" id="github" onChange={(e)=>this.onChange(e)}  value={this.state.github} />
                                        </Form.Group>

                                        <Form.Group as={Col} md={3} >
                                            <Form.Label>GoogleDrive Url</Form.Label>
                                            <Form.Control  name="GoogleDrive" id="GoogleDrive" onChange={(e)=>this.onChange(e)} value={this.state.GoogleDrive} />
                                        </Form.Group>
                                        <Form.Group as={Col} md={3} >
                                            <Form.Label>Url do site</Form.Label>
                                            <Form.Control  name="Url" id="Url" onChange={(e)=>this.onChange(e)} value={this.state.Url} />
                                        </Form.Group>
                                    </Form.Row>


                                    <Button className="btn-wf" onClick={(e)=>this.onSubmit(e)}>
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
