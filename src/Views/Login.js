import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import logo from './../Assets/CodeMarkerLogo.png'
import TextField from 'material-ui/TextField'
import { Jumbotron } from 'react-bootstrap'
import React, { Component } from 'react'
import Auth from './../Api/auth'
import {red500} from 'material-ui/styles/colors'

const styles = {
    underlineStyle: {
        borderColor: red500,
    },
    hintStyle: {
        color: red500
    }
};

class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    login () {
        console.log('Logging in..')
        Auth.login(this.state.username, this.state.password, (loggedIn) => {
            if (loggedIn) {
                window.location = '/'
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.login();

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

                    <div className="login">
                        <form onSubmit={this.handleSubmit}>
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.hintStyle}
                            onChange={(event, newValue) => this.setState({username: newValue})}
                        />
                        <br/>
                        <TextField
                            label="secondary"
                            type="password"
                            class="red"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.hintStyle}
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>
                            <RaisedButton className="loginButton" label="Submit" type="submit" primary={true} style={style}/>
                        </form>
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