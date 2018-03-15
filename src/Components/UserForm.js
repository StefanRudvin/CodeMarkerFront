import React from 'react'
import axios from 'axios'
import Routes from './../Api/routes'
import Events from './../client.js'
import { toast } from 'react-toastify'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {required, email, password} from './../Validator'

class UserForm extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: ''
        }

        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUserNameChange = this.handleUserNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleUserNameChange (e) {
        this.setState({username: e.target.value})
    }

    handlePasswordChange (e) {
        this.setState({password: e.target.value})
    }

    handleEmailChange (e) {
        this.setState({email: e.target.value})
    }

    handleSubmit (e) {
        e.preventDefault()
        this.addItem()

        this.setState((prevState) => ({
            username: '',
            password: '',
            email: '',
        }))
    }

    reset () {
        this.refs.usernameTextArea.value = ''
        this.refs.passwordTextArea.value = ''
        this.refs.emailTextArea.value = ''
        this.setState({username: ''})
        this.setState({email: ''})
        this.setState({password: ''})
    }

    addItem () {
        let formData = new FormData()
        let self = this

        formData.append('username', this.state.username)
        formData.append('password', this.state.password)
        formData.append('email', this.state.email)
        axios.post(Routes.base + this.props.route + '/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            Events.emit(this.props.event)
            self.reset()
            toast('Item Added!')
        })
    }

    render () {
        return (
            <Form>
                <label className="label">Add new User</label>
                <div>
                    <label className="wideForm">
                        Username
                        <Input
                            ref="usernameTextArea"
                            name="username"
                            className="input"
                            onChange={this.handleUserNameChange}
                            value={this.state.username}
                            type="text"
                            placeholder="User Name"
                            validations={[required]}/>
                    </label>
                </div>
                <div>
                    <label className="wideForm">
                        Email
                        <Input
                            name="email"
                            className="input"
                            type="email"
                            placeholder="Email address"
                            onChange={this.handleEmailChange}
                            value={this.state.email}
                            ref="emailTextArea"
                            validations={[required, email]}/>
                    </label>
                </div>
                <div>
                    <label className="wideForm">
                        Password
                        <Input
                            name="password"
                            ref="passwordTextArea"
                            className="input"
                            onChange={this.handlePasswordChange}
                            value={this.state.password}
                            placeholder="Password"
                            type="password"
                            validations={[required]}>
                        </Input>
                    </label>
                </div>
                <div>
                    <div className="button" onClick={this.handleSubmit}>
                        Submit
                    </div>
                </div>
            </Form>
        )
    }
}

export default UserForm