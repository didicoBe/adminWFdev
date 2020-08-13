import React, { Component } from 'react'
import {Container, Card, Row, Col  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";
import  ChartsClientes   from "../../charts";
import  ChartsMeses   from "../../charts/meses";
import "animate.css"


import './style.css'

export default class Dash extends Component {

    state ={
        logado: true,
        nome:'',
        teste: ''
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


    addanimacao(){
        this.setState({
            teste:'animate__animated animate__jackInTheBox'
        })
    }
    removeanimacao(){
        setTimeout(()=>{
            this.setState({
                teste:''
            })
        },1000)
        
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
                            <h5>Dashboard</h5>
                            <Row>
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__jackInTheBox">
                                        <Card.Body>
                                            <Card.Title>Total de Clientes</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Total vs Novos</Card.Subtitle>
                                            <Card.Text>
                                                <ChartsClientes/>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__jackInTheBox">
                                        <Card.Body>
                                            <Card.Title>Total de Projetos</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Em andamento Vs Finalizados</Card.Subtitle>
                                            <Card.Text>
                                                <ChartsClientes/>
                                            </Card.Text>
                                            
                                        </Card.Body>
                                    </Card>
                                </Col>
                               
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__jackInTheBox" >
                                        <Card.Body>
                                            <Card.Title>Faturamento Mensal</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Mês atual Vs 2 meses passados</Card.Subtitle>
                                            <Card.Text>
                                                <ChartsMeses/>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__jackInTheBox" >
                                        <Card.Body>
                                            <Card.Title>Suporte</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Tickets em aberto Vs Fechados</Card.Subtitle>
                                            <Card.Text>
                                                <ChartsClientes/>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <Card style={{ marginTop:20 }} className="animate__animated  animate__jackInTheBox">
                                        <Card.Body>
                                            <Card.Title>Total de Orçamentos</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">todos os orçamentos feitos até hoje</Card.Subtitle>
                                            <Card.Text>
                                                    <div style={{fontSize:45,fontWeight:300, textAlign:'center'}}>150</div>
                                            </Card.Text>
                                            
                                        </Card.Body>
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
