import React, { Component } from 'react'

import Auth from './../Services/Auth'

import LoginView from './../Views/Login.js'
import MyRouter from './MyRouter'

class Authenticator extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }

    static requireAuth () {
        return !Auth.loggedIn()
    }

    render () {
        if(Authenticator.requireAuth()) {
            return (<LoginView/>)
        } else {
            return (
                    <MyRouter/>
            )
        }
    }
}

export default Authenticator