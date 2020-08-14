import React, { Component } from 'react';
import {Form, Button,Card } from 'react-bootstrap';
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import './style.css';

export default class Login extends Component {
    state={
        login:'',
        senha:'',
        token:'',
        logado:false
    }


    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    login = async (e)=>{
        e.preventDefault()

        const body = {
            login: this.state.login,
            senha: this.state.senha 
        }
        
        await api.post('/login', body).then(response=>{
            localStorage.setItem('login', response.data.response[0].email);
            localStorage.setItem('token', response.data.response[0].token);
            localStorage.setItem('nome', response.data.response[0].nome);
            localStorage.setItem('id', response.data.response[0].id);
            return(
                this.props.history.push('/dash')
            )
        }).catch((erro)=>{
                    
                    toast.error('🥺 Erro ao fazer login, verifique login e senha', {
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

    validaOnline = ()=>{
        const login = localStorage.getItem('login');
        const token = localStorage.getItem('token');
        const nome = localStorage.getItem('nome');

        var resposta = false


        
        if(login === null || token === null){
            return resposta

        }else{
            resposta = api.get('/login/valida/'+login+'/'+token).then(response=>{
                this.setState({
                    logado: true,
                    nome:nome
                })
                toast.success('😁 Seja bem vindo(a) '+nome, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

                return  true
            }).catch((erro)=>{
                this.setState({
                    logado: false,
                    nome:nome
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
        return (
            <div style={{paddingTop:'150px'}} className="fundo">
                <ToastContainer/>
                <div className="centroLogin">
                    <img src="/img/LogoNEGATIVO2.png" className='imgLogin' alt="WfDev" />
                </div>
                <div className="centroLogin">
                    <Card style={{width:300,boxShadow:'3px 3px 6px black'}}>
                        <Card.Body>
                            <Card.Title style={{textAlign:'center'}}>Admin</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted" style={{textAlign:'left'}}>Login</Card.Subtitle>
                            <div>
                                <Form onSubmit={(e)=>{this.login(e)}}>
                                    <Form.Group >
                                        <Form.Control type="email" placeholder="Entre com seu email" name="login" id="login" onChange={(e)=>{this.onChange(e)}} />
                                    </Form.Group>
    
                                    <Form.Group >
                                        <Form.Control type="password" placeholder="senha"  name="senha" id="senha" onChange={(e)=>{this.onChange(e)}} />
                                    </Form.Group>
                                    <Button variant="secondary" type="submit">
                                    Entrar
                                    </Button>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            
        
        );
    }else{
        this.props.history.push('/dash')
        return null
    }
    
  }
}
