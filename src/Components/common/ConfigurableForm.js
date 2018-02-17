import { Link } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import Routes from './../../Api/routes'
import Events from './../../client.js'

class ConfigurableForm extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            id: '',
        }

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange (e) {
        this.setState({name: e.target.value})
    }

    handleDescriptionChange (e) {
        this.setState({description: e.target.value})
    }

    handleSubmit (e) {
        e.preventDefault()
        console.log('Handle submit!')
        this.addItem()

        this.setState((prevState) => ({
            description: '',
            updated_at: '',
            name: '',
            id: '',
        }))
    }

    reset() {
        this.refs.descriptionTextArea.value =''
        this.refs.nameTextArea.value =''
        this.setState({name: ''})
        this.setState({description: ''})
    }

    addItem () {
        let formData = new FormData()
        let self = this

        console.log(this.state.name)
        console.log(this.state.description)

        formData.append('name', this.state.name)
        formData.append('description', this.state.description)
        axios.post(Routes.base + this.props.route + '/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            Events.emit(this.props.event)
            self.reset();
        })
    }

    render () {
        return (
            <div className="content">
                <div className="field">
                    <label className="label">{this.props.title}</label>
                    <div className="control">
                        <input
                            ref="nameTextArea"
                            className="input"
                            onChange={this.handleNameChange}
                            value={this.props.name}
                            type="text"
                            placeholder="Course Name"/>
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                            <textarea
                                ref="descriptionTextArea"
                                className="textarea"
                                onChange={this.handleDescriptionChange}
                                value={this.props.description}
                                placeholder="Course Description">
                            </textarea>
                    </div>
                </div>

                <div className="button" onClick={this.handleSubmit}>
                    Submit
                </div>
            </div>
        )
    }
}

export default ConfigurableForm