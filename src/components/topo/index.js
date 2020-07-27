import React, { Component } from 'react'
import {Navbar , Image } from 'react-bootstrap';


import "./style.css"

export default class Topo extends Component {
    render() {
        return (
            <div>
                <Navbar className="pretoTopo" expand="lg" fixed="top">
                    <Navbar.Brand href="#">
                        <Image src="/img/LogoNEGATIVO2.png" fluid style={{maxHeight:'45px'}}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    
                </Navbar>
            </div>
        )
    }
}
