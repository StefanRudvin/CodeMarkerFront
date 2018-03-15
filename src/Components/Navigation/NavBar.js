import logo from './../../Assets/CodeMarkerLogo.png'
import * as ReactDOM from 'react-dom'
import Routes from '../../Api/routes'
import Auth from './../../Api/auth'
import React from 'react'
import axios from 'axios'

class NavBar extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            user: {
                is_superuser: false,
                is_staff: false,
                username: ''
            }
        }
    }

    componentDidMount () {
        if (Auth.loggedIn()){
            this.getUser()
        }
    }

    getUser() {
        axios.post(Routes.auth.get_user)
            .then((response) => {
                return response.data
            })
            .then((response) => {
                this.setState({user: response})
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }

    static logout () {
        Auth.logout()
        window.location = '/login'
    }

    toggleBurger () {
        let burger = ReactDOM.findDOMNode(this.refs.burger);
        burger.classList.toggle('is-active');

        let menu = ReactDOM.findDOMNode(this.refs.menu);
        menu.classList.toggle('is-active');
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
                <div ref="burger" className="navbar-burger burger" data-target="navbarExampleTransparentExample" onClick={this.toggleBurger.bind(this)}>
                    <span/>
                    <span/>
                    <span/>
                </div>
                <div ref="menu"id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        {Auth.loggedIn() ? (
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link" href="/">
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
                                <a href={"/users/" + this.state.user.id} className="userNameLink">
                                    {this.state.user.username}
                                </a>
                            </div>
                        ) : null}

                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                {this.state.user.is_staff || this.state.user.is_superuser ? (
                                    <p className="control">
                                        <a className="bd-tw-button button" href="/admin">
                                        <span>
                                        Manage
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