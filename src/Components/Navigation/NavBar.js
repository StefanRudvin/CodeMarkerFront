import React from 'react'
import logo from './../../Assets/CodeMarkerLogo.png'
import Auth from './../../Api/auth'

class NavBar extends React.Component {

    componentDidMount () {
        Auth.getUserName()
    }

    static logout () {
        Auth.logout()
        window.location = '/login'
    }

    render () {
        return (
            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src={logo} width="40" alt="" height="80"/>
                        Codemarker
                    </a>
                </div>
                <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span/>
                    <span/>
                    <span/>
                </div>
                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        {Auth.loggedIn() ? (
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link" href="/courses/">
                                    Courses
                                </a>
                                <div className="navbar-dropdown is-boxed">
                                    {this.props.courses.map(course => (
                                        <a className="navbar-item" href={'/courses/' + course.id}>
                                            {course.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        {Auth.loggedIn() ? (
                            <div className="navbar-item is-hoverable">
                                <span>
                                    {Auth.getUserName()}
                                </span>
                            </div>
                        ) : null}

                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                {Auth.isAdmin() ? (
                                    <p className="control">
                                        <a className="bd-tw-button button" href="/admin">
                                        <span>
                                        Admin
                                        </span>
                                        </a>
                                    </p>
                                ) : null}

                                {Auth.loggedIn() ? (
                                    <p className="control">
                                        <a className="bd-tw-button button" onClick={() => {NavBar.logout()}}>
                                        <span>
                                        Logout
                                        </span>
                                        </a>
                                    </p>
                                ) : <p className="control">
                                    <a className="bd-tw-button button" href="/login">
                                        <span>
                                        Login
                                        </span>
                                    </a>
                                </p>}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar