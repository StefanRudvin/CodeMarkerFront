import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      <div className="navBar" style={navStyle}>
        <Navbar inverse collapseOnSelect style={testStyle}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Codemarker</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown title="Courses" id="basic-nav-dropdown">
                {this.props.courses.map(course => (
                  <MenuItem key={course.id}>{course.name}</MenuItem>
                ))}
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem><Link to="/user">Profile</Link></NavItem>
              <NavItem><Link to="/login">Login</Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
};

const navStyle = {
  marginBottom: 0,
}
const testStyle = {
  marginBottom: 0,
  borderRadius: 0
}

export default NavBar;