import React, { Component } from 'react'
import {Container,Card,Button  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";
import { Link } from 'react-router-dom';

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
                                <div className='titulos'>Projeto: {this.state.data.nome}</div>
                                <div>
                                    <Link to={"/clientes/" + this.state.data.idCliente}>
                                        <Button className="btn-wf float-right">voltar</Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </Container>
                </div>
            )
        }
    }
}
