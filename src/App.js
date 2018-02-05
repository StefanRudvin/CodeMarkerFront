import React, { Component } from 'react'
import axios from 'axios'

// Components
import NavBar from './Components/Navigation/NavBar.js'
import Authenticator from './Components/Authenticator'
import Routes from './Api/routes'

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
        axios.get(Routes.get.courses)
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
