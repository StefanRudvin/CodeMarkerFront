import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react'
import logo from './../../Assets/CodeMarkerLogo.png';

class NavBar extends React.Component {
    render () {
        return (
            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src={logo} width="40" height="80"/>
                        Codemarker
                    </a>
                    <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" href="/">
                                Courses
                            </a>
                            <div className="navbar-dropdown is-boxed">
                                {this.props.courses.map(course => (
                                    <a className="navbar-item" href={"/courses/" + course.id}>
                                        {course.name}
                                    </a>
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">
                                    <a className="bd-tw-button button" href="/admin">
                                        <span>
                                        Admin
                                        </span>
                                    </a>
                                </p>
                                <p className="control">
                                    <a className="bd-tw-button button" href="/admin">
                                        <span>
                                        Logout
                                        </span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            /*<div className="navBar is-transparent" style={navStyle}>
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
                                    <MenuItem key={course.id}><Link
                                        to={'/courses/' + course.id}>{course.name}</Link></MenuItem>
                                ))}
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem><Link to="/admin">Admin</Link></NavItem>
                            /*<NavItem><Link to="/user">Profile</Link></NavItem>*!/
                            <NavItem><Link to="/login">Login</Link></NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>*/
        )
    }
}

export default NavBar