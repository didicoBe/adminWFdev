import React, { Component } from 'react'
import {Navbar , Image } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

import "./style.css"

export default class Topo extends Component {
    render() {
        return (
            <div>
                <Navbar className="pretoTopo" expand="lg" fixed="top">
                    <Navbar.Brand href="/dash">
                        <Image src="/img/LogoNEGATIVO2.png" fluid style={{maxHeight:'45px'}}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="usuarioTopo">
                            {this.props.nome}
                        </Navbar.Text>
                        <Navbar.Text className="usuarioTopo">
                            <Link to='/configuser'>
                                <FontAwesomeIcon icon={faUserCog} color="white" fontSize="30px"  className="configTopo" />
                            </Link>   
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
