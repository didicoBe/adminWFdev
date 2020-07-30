import React, { Component } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu,SidebarContent,SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, Redirect } from 'react-router-dom';

import { toast } from "react-toastify";

import  api from "../../service";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns,faFireAlt, faTicketAlt,faMoneyBillWave,faUsers,faUserEdit,faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { faWpforms } from '@fortawesome/free-brands-svg-icons'

import "./style.css"

export default class SideBar extends Component {

    state={
        sair:false
    }



    sair = async()=>{
        const login = localStorage.getItem('login');
        const token = localStorage.getItem('token');
        
       const retorno =  await api.get('/logout/'+login+'/'+token).then(response=>{
            //localStorage.clear();
            console.log(login)
            console.log(token)
            return true
            
        }).catch(e=>{
            
            
            console.log(e);
            return false
        })

        if(retorno){
            localStorage.clear();
            this.setState({sair:true})
            
        }else{
            toast.error('🥺 Erro sair falar com os programadores', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }




       
    }





    render() {
        if(this.state.sair){
            return(
                <Redirect push to="/" />
            )
        }else{
            return (
                <div style={{marginRight:'270px'}}>
                    <ProSidebar >
                        <SidebarContent>
                       
                        <Menu iconShape="square">
                            <MenuItem icon={<FontAwesomeIcon icon={faColumns} color="white"/>}>
                                Dashboard
                                <Link to="/dash" />
                            </MenuItem>
                            <MenuItem icon={<FontAwesomeIcon icon={faFireAlt} color="white"/>}>Clientes</MenuItem>
                            <MenuItem icon={<FontAwesomeIcon icon={faTicketAlt} color="white"/>}>Suporte</MenuItem>
                            <MenuItem icon={<FontAwesomeIcon icon={faMoneyBillWave} color="white"/>}>Financeiro</MenuItem>
                            <SubMenu title="Orçamentos" icon={<FontAwesomeIcon icon={faWpforms} color="white"/>}>
                                <MenuItem>
                                    <FontAwesomeIcon icon={faUsers} color="white" /> Todos
                                    <Link to="/orcamento"/>
                                </MenuItem>
                                <MenuItem>
                                    <FontAwesomeIcon icon={faUserEdit} color="white"/> Criar novo
                                    <Link to="/novoorcamento"/>
                                </MenuItem>
                                
                            </SubMenu>
                            <MenuItem 
                                icon={<FontAwesomeIcon icon={faDoorOpen} 
                                color="white"/>}
                                onClick={this.sair}
                            >Sair</MenuItem>
                        </Menu>
                        </SidebarContent>
                        <SidebarFooter>
                            <div style={{display:'flex',}}>
                                <div style={{marginLeft:'10px'}}>Desenvolvido por WFDev</div>
                                <div style={{marginLeft:'15px'}}><FontAwesomeIcon icon={faDoorOpen} color="white" onClick={this.sair}/></div>
                            </div>
                            
                        </SidebarFooter>
                    </ProSidebar>
                </div>
            )
        }
        
    }
}

