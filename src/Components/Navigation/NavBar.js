import React from 'react';
import { Navbar, Jumbotron, Button, MenuItem, NavItem, NavDropdown, Nav } from 'react-bootstrap';
import Style from './../../Css/style.scss';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const NavBar = props => {
  const navStyle = {
    color: 'blue',
    background: 'blue',
    marginBottom: 0,
  }
  const testStyle = {
    marginBottom: 0,
    borderRadius: 0
  }
  return (
    <div className="navBar" style={navStyle}>
      <Navbar inverse collapseOnSelect style={testStyle}>
        <Navbar.Header>
          <Navbar.Brand>
            <a><Link to="/">Codemarker</Link></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}><Link to="/courses">Courses</Link></NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Profile</NavItem>
            <NavItem eventKey={2} href="#">Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;