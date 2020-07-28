import React, { Component } from 'react'
import Topo from "../../topo";
import  api from "../../../service";




export default class ConfigUser extends Component {
    state ={
        logado: true,
        nome:''
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
        return (
            <div>
                <Topo
                    nome={this.state.nome}
                />
            </div>
        )
    }
}
