// Packages
import { ToastContainer, toast } from 'react-toastify'
import React, { Component } from 'react'
import axios from 'axios'

// Components
import NavBar from './../Components/Navigation/NavBar.js'
import Authenticator from './../Components/Authenticator'
import Routes from './../Services/Routes'
import Auth from './../Services/Auth'

// CSS
import 'bulma/css/bulma.css'
import './../Css/App.css'

// Dispatchers
import Events from './../Services/EventEmitter'

class MainContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            courses: [],
        }
    }

    componentDidMount() {
        if (Auth.loggedIn()) {
            this.getCourses()
        }

        Events.on('onCoursesChanged', () => {
            this.getCourses()
        });
    }

    getCourses() {
        axios.get(Routes.courses_json)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({ courses: json })
            })
    }

    render() {
        return (
            <div className="App">
                <ToastContainer className="toast" autoClose={3000} hideProgressBar={true} position={toast.POSITION.BOTTOM_RIGHT} />
                <NavBar courses={this.state.courses} />
                <div className="container">
                    <Authenticator />
                </div>
            </div>
        )
    }
}

export default MainContainer