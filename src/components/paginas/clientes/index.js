import React, { Component } from 'react'
import {Container,Card, Button,ListGroup  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";
import { Link } from 'react-router-dom';

export default class Clientes extends Component {
    state ={
        logado: true,
        nome:'',
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


    pegadadosCliente = ()=>{
        var resposta = false
        resposta = api.get('/cliente').then(response=>{
            this.setState({
                data:response.data
            })
            return  true
        }).catch((erro)=>{
            return false
        })
    }


    abrepagina = (id)=>{
        return(
            this.props.history.push('/clientes/'+id)
        )
    }



    componentDidMount(){
        this.validaOnline()
        this.pegadadosCliente()
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
                                <div className='titulos'>Nossos clientes.</div>
                                <div>
                                    <Link to="/novocliente">
                                        <Button className="btn-wf float-right">Novo</Button>
                                    </Link>
                                </div>
                            </div>
                            <div style={{marginTop:'60px'}}>
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <div style={{width:150}}>Nome Fantasia</div>
                                    <div style={{width:150}}>Nome Razao social</div>
                                    <div style={{width:150}}>Nome responsavel</div>
                                    <div style={{width:100}}>editar</div>
                                </div>
                                

                                <hr/>
                                <ListGroup variant="flush">
                                    {this.state.data.map((resp)=>{
                                        return(
                                        <ListGroup.Item key={resp.id}>
                                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                                <div style={{width:180}}>{resp.nomeFantasia}</div>
                                                <div style={{width:180}}>{resp.razaoSocial}</div>
                                                <div style={{width:180}}>{resp.nomeResponsavel}</div>
                                                
                                                <Button className="btn-wf" onClick={()=>this.abrepagina(resp.id)}>visualizar</Button>
                                                
                                                
                                            </div>
                                            
                                        </ListGroup.Item>)
                                    })}
                                </ListGroup>
                            </div>
                           
                        </Card>
                    </Container>
                </div>
            )
        }
    }
}
