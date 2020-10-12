import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const NavBar = (props) => {

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Demolition Nutrition</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
                    <Nav.Link as={Link} to="/Journal">Journal</Nav.Link>
                </Nav>
                <Nav.Link as={Link} to="/login">Log In</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;