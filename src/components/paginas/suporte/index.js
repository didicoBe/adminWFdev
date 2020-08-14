import React, { Component } from 'react'
import {Container,Card, Button,ListGroup,InputGroup, FormControl  } from 'react-bootstrap';
import Topo from "../../topo";
import SideBar from "../../sidebar";
import  api from "../../../service";
import { ToastContainer ,toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import SearchResults from 'react-filter-search';

export default class Suporte extends Component {

    state ={
        logado: true,
        nome:'',
        suportePendente: [],
        suporteEmAndamento: [],
        suporteResolvido: [],
        value: '',
        data : []
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

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
        this.ApiSuporte()
    }

    ApiSuporte = ()=>{
        var resposta = false
        resposta = api.get('/suporte').then(response=>{
            console.log(response)
            this.setState({
                data:response.data,
                suportePendente:response.data.filter(data => data.status == 'Pendente'),
                suporteEmAndamento:response.data.filter(data => data.status == "Em andamento"),
                suporteResolvido:response.data.filter(data => data.status == 'Resolvido')
            })


            return  true
        }).catch((erro)=>{
            return false
        })
    }

    render() {

        console.log(this.state)
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
                                <div className='titulos'>Ticket de suporte.</div>
                                <div>
                                    <Link to="/novocliente">
                                        <Button className="btn-wf float-right">Novo</Button>
                                    </Link>
                                </div>
                            </div>

                            {/*aqui entra o filtro  */}
                            <div>
                                <InputGroup className="mt-5 col-md-3 float-right">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch} color="#7b347f" style={{marginRight:10}}/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="pesquisar"
                                        aria-label="pesquisar"
                                        aria-describedby="basic-addon1"
                                        value={this.state.value} onChange={this.handleChange}
                                    />
                                </InputGroup>
                            </div>


                            <div style={{marginTop:'30px'}}>
                                <div style={{display:'flex',justifyContent:'space-between', fontWeight:'600', color:'#7b347f'}}>
                                    <div style={{width:150}}>Nome Fantasia</div>
                                    <div style={{width:150}}>Nome Razao social</div>
                                    <div style={{width:150}}>Nome responsavel</div>
                                    <div style={{width:100}}>Visualizar</div>
                                </div>


                                <hr/>


                                <SearchResults
                                    value={this.state.value}
                                    data={this.state.data}
                                    renderResults={results => (
                                        <div>
                                        {this.state.data.map(el => (
                                            <ListGroup.Item key={el.id}>
                                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                                    <div style={{width:180}}>{el.nomeUsuario}</div>
                                                    <div style={{width:180}}>{el.assunto}</div>
                                                    <div style={{width:180}}>{el.data}</div>

                                                    <Button className="btn-wf" onClick={()=>this.abrepagina(el.id)}>visualizar</Button>


                                                </div>

                                            </ListGroup.Item>
                                        ))}
                                        </div>
                                    )}
                                />


                            </div>


                        </Card>
                    </Container>
                </div>
            )
        }
    }
}
