// Packages
import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios'

// Components
import NavBar from './Components/Navigation/NavBar.js'
import Authenticator from './Components/Authenticator'
import Routes from './Api/routes'
import Auth from './Api/auth'

// JS
import Events from './client'

// CSS
import 'bulma/css/bulma.css'
import './Css/App.css'

// Set token to all requests
axios.interceptors.request.use(function (config) {
    config.headers.authorization = 'Token ' + Auth.token()
    return config
}, function (error) {
    return Promise.reject(error);
});

// Log all error messages
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    swal(String(error), String(error.response.data));
    return Promise.reject(error);
});

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {
            courses: [],
        }
    }

    componentDidMount () {
        if (Auth.loggedIn()) {
            this.getCourses()
        }
        Events.on('onCoursesChanged', () => {
            this.getCourses()
        });
    }

    getCourses () {
        axios.get(Routes.courses_json)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({courses: json})
            })
    }

    render () {
        return (
            <div className="App">
                <NavBar courses={this.state.courses}/>
                <div className="container">
                    <Authenticator/>
                </div>
            </div>
        )
    }
}

export default App
