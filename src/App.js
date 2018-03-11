// Packages
import React, { Component } from 'react'
import swal from 'sweetalert2';
import axios from 'axios'

// CSS
import 'bulma/css/bulma.css'
import './Css/App.css'
import Container from './Services/Container'
import UserActions from './Services/User/UserActions'

// TODO Refactor the following out
// Set token to all requests
axios.interceptors.request.use(function (config) {
    config.headers.authorization = 'Token ' + UserActions.getUser().token
    return config
}, function (error) {
    return Promise.reject(error);
});

// Log all error messages
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response !== undefined) {
        if (error.response.data !== undefined) {
            swal(String(error), String(error.response.data));
        } else {
            swal(String(error), String(error.response));
        }
    } else {
        swal(String(error), String('Something is wrong with the backend server.'));
    }

    return Promise.reject(error);
});

class App extends Component {

    render() {
        return (
            <div className="App">
                <Container />
            </div>
        )
    }
}

export default App
