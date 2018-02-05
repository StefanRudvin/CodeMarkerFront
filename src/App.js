import React, { Component } from 'react'
import axios from 'axios'

// Components
import NavBar from './Components/Navigation/NavBar.js'
import Authenticator from './Components/Authenticator'

// CSS
import 'bulma/css/bulma.css'
import './Css/App.css'

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {
            courses: [],
        }
    }

    componentDidMount () {
        const url = 'http://127.0.0.1:8000/api/courses/?format=json'
        axios.get(url)
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
