import React, { Component } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu,SidebarContent,SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns,faFireAlt, faTicketAlt,faMoneyBillWave,faUsers,faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { faWpforms } from '@fortawesome/free-brands-svg-icons'

import "./style.css"

export default class SideBar extends Component {
    render() {
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
                            <MenuItem icon={<FontAwesomeIcon icon={faUsers} color="white"/>}>Todos</MenuItem>
                            <MenuItem icon={<FontAwesomeIcon icon={faUserEdit} color="white"/>}>Criar novo</MenuItem>
                            
                        </SubMenu>
                    </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        Desenvolvido por WFDev
                    </SidebarFooter>
                </ProSidebar>
            </div>
        )
    }
}
