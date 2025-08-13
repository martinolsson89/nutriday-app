import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {LinkContainer} from 'react-router-bootstrap';

export function NavMenu() {
    return (
      <Navbar className="custom-navbar" expand="lg">
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Hem</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="mr-auto">
            <LinkContainer to="/products">
              <Nav.Link>Matlistan</Nav.Link>
            </LinkContainer>
          </Nav>
          {/*<Nav className="mr-auto">*/}
          {/*  <LinkContainer to="/groupview">*/}
          {/*    <Nav.Link>Temp page for product viewing</Nav.Link>*/}
          {/*  </LinkContainer>*/}
          {/*</Nav>*/}
          <Nav className="custom-ml-auto">
            <LinkContainer to="/about">
              <Nav.Link>Om NutriDay</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
