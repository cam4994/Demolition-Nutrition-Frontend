import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const NavBar = (props) => {

    return (
        <Navbar expand="lg">
            <Navbar.Brand href="#home">Demolition Nutrition</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {props.user !== '' ? (
                        <>
                            <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
                            <Nav.Link as={Link} to="/journal">Journal</Nav.Link>
                            <Nav.Link as={Link} to="/search">Food Search</Nav.Link>
                            <Nav.Link as={Link} to="/tips">Tips</Nav.Link>
                        </>
                    ) : null}
                    
                </Nav>
                {props.user === '' ? (
                    <Nav.Link className="login-link" as={Link} to="/login">Log In</Nav.Link>
                ) : (
                    <Nav.Link className="signout-link" as={Link} to="/signout">Sign Out</Nav.Link>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;