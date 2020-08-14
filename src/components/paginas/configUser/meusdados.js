import React, { Component } from 'react'
import {Container,Card,Button,Form  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";
import { Link } from 'react-router-dom';

export default class Meusdados extends Component {
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
        const id = localStorage.getItem('id');

        this.pegadadosUser(id)

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
                    nome:nome,
                    id:id
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

    pegadadosUser = (id)=>{
        api.get('/login/id/'+id).then(response=>{
            this.setState({
                data: response.data.response[0]
            })
            return  true
        }).catch((erro)=>{
            
        })
    }

    componentDidMount(){
        this.validaOnline()
        
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
                                <div className='titulos'>Meus Dados</div>
                                <div>
                                    <Link to={"/configuser"}>
                                        <Button className="btn-wf float-right">Voltar</Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>

                        
                        <Card style={{ marginTop:20 }}>
                            <Card.Body>
                                <Card.Title>{this.state.data.nome}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Dados</Card.Subtitle>
                                <Card.Text>
                                    <hr/>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Permissão</Form.Label>
                                        <Form.Control type="text"  md={4} value={this.state.data.permissao} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail" >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" md={4} value={this.state.data.email}/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="password"  md={4} value={this.state.data.senha} />
                                    </Form.Group>
                                    <Button className="btn-wf" onClick={(e)=>this.onSubmit(e)}>
                                        Mudar
                                    </Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            )
        }
    }
}
