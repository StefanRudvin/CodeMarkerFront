import { Button, Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react'
import axios from 'axios'

class Course extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            course: {
                'assessments': []
            },
            name: '',
            description: '',
            additional_help: '',

        }
        this.props.history.listen((location, action) => {
            let id = location.pathname.slice(9)
            this.getCourse(id)
        })

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleAdditionalHelpChange = this.handleAdditionalHelpChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getCourse (id) {
        let url = 'http://127.0.0.1:8000/api/courses/' + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                console.log(json)
                this.setState({course: json})
            })
    }

    componentDidMount () {
        this.getCourse(this.props.match.params.id)
    }

    render () {
        return (
            <div>

                <Jumbotron>
                    <h1>{this.state.course.name}</h1>
                    <p>{this.state.course.description}</p>
                </Jumbotron>

                <div className="content">
                    <p>Created at: {this.state.course.created_at}</p>
                    <p>Updated at: {this.state.course.updated_at}</p>

                    <h2>Assessments</h2>
                    <ListGroup>
                        {
                            this.state.course.assessments.map(function (assessment) {
                                return <ListGroupItem header={assessment.name} href={'/assessments/' + assessment.id}>Created
                                    at {assessment.created_at}</ListGroupItem>
                            })
                        }
                    </ListGroup>
                </div>

                <br/>

                <div className="content">
                    <div className="field">
                        <label className="label">Create New Assessment</label>
                        <div className="control">
                            <input
                                className="input"
                                onChange={this.handleNameChange}
                                value={this.state.name}
                                type="text"
                                placeholder="Assessment Name"/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <textarea
                                className="textarea"
                                onChange={this.handleDescriptionChange}
                                value={this.state.description}
                                placeholder="Assessment Description">
                            </textarea>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <textarea
                                className="textarea"
                                onChange={this.handleAdditionalHelpChange}
                                value={this.state.additional_help}
                                placeholder="Assessment Additional Information">
                            </textarea>
                        </div>
                    </div>

                    <div className="button" onClick={this.handleSubmit}>
                        Submit
                    </div>
                    <br/>
                    <br/>
                    <br/>
                </div>

            </div>
        )
    }

    handleNameChange (e) {
        this.setState({name: e.target.value})
    }

    handleDescriptionChange (e) {
        this.setState({description: e.target.value})
    }

    handleAdditionalHelpChange (e) {
        this.setState({additional_help: e.target.value})
    }

    handleSubmit (e) {
        e.preventDefault()

        this.addAssessment()

        this.setState((prevState) => ({
            description: '',
            additional_help: '',
            name: '',
        }))
    }

    addAssessment () {
        const url = 'http://127.0.0.1:8000/api/assessments/'

        var self = this

        let formData = new FormData()

        formData.append('name', this.state.name)
        formData.append('description', this.state.description)
        formData.append('additional_help', this.state.additional_help)
        formData.append('course', parseInt(this.props.match.params.id))
        formData.append('course_id', parseInt(this.props.match.params.id))
        formData.append('user', 1)
        formData.append('resource_id', null)
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            self.getCourse(self.props.match.params.id)
        }).catch(function (error) {
            self.getCourse(self.props.match.params.id)
        })

    }

}

export default Course