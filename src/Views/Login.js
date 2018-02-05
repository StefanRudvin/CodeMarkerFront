import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import logo from './../Assets/CodeMarkerLogo.png'
import TextField from 'material-ui/TextField'
import { Jumbotron } from 'react-bootstrap'
import React, { Component } from 'react'
import Auth from './../Api/auth'

class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    login () {
        console.log('Logging in..')
        Auth.login(this.state.username, this.state.password, (loggedIn) => {
            if (loggedIn) {
                window.location = '/'
            }
        })
    }

    render () {
        return (
            <div>
                <MuiThemeProvider>
                    <Jumbotron>
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Codemarker</h1>
                        <br/>
                        <p className="App-intro">
                            Welcome to Codemarker! Please login to continue.
                        </p>
                    </Jumbotron>

                    <div>
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({username: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style}
                                      onClick={() => {this.login()}}/>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

const style = {
    margin: 15,
}
export default Login