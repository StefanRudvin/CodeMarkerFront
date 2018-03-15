// Packages
import { ToastContainer, toast } from 'react-toastify'
import React, { Component } from 'react'
import swal from 'sweetalert2'
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

// Configure environment variables
require('dotenv').config()

// Set token to all requests
axios.interceptors.request.use(function (config) {
    config.headers.authorization = 'Token ' + Auth.token()
    return config
}, function (error) {
    return Promise.reject(error)
})

// Log all error messages
axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    console.log(error.response)
    if (parseInt(error.response.status) == 403) {

        swal(String(error), error.response.data + error.response.data.detail)
    } else if (error.response !== undefined) {
        if (error.response.data !== undefined) {
            swal(String(error), String(error.response.data + error.response.data.detail))
        } else {
            swal(String(error), String(error.response  + error.response.data.detail))
        }
    } else {
        swal(String(error), String('Something is wrong with the backend server.'))
    }

    return Promise.reject(error)
})

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
        })
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
                <ToastContainer className="toast" autoClose={3000} hideProgressBar={true}
                                position={toast.POSITION.BOTTOM_RIGHT}/>
                <NavBar courses={this.state.courses}/>
                <div className="container">
                    <Authenticator/>
                </div>
            </div>
        )
    }
}

export default App
