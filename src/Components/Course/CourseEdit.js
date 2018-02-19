import { Jumbotron, ListGroup, ListGroupItem, Col } from 'react-bootstrap'
import { ClimbingBoxLoader } from 'react-spinners'
import Dropzone from 'react-dropzone'
import Dropdown from 'react-dropdown'
import moment from 'moment'
import React from 'react'
import axios from 'axios'
import Events from './../../client.js'
import Routes from '../../Api/routes'
import { toast } from 'react-toastify'

class CourseEdit extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            description: '',
            name: '',
            course_id: '',
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    }

    componentDidMount () {
        Events.on('onCourseRetrieved', (course) => {
            console.log(course)
            this.setState({name: course.name})
            this.setState({description: course.description})
            this.setState({course_id: course.id})
        });
    }

    handleNameChange (e) {
        this.setState({name: e.target.value})
    }

    handleDescriptionChange (e) {
        this.setState({description: e.target.value})
    }

    updateCourse () {
        let formData = new FormData()

        formData.append('name', this.state.name)
        formData.append('course_id', this.state.course_id)
        formData.append('description', this.state.description)

        axios.put(Routes.courses + this.state.course_id + '/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                    toast('User added to course')
                    Events.emit('onCoursesChanged')
                    Events.emit('onCourseEditComplete')
                }
            )
    }

    render () {
        return (
            <div>
                <div className="content">
                    <h2>Update Course</h2>
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            ref="nameTextArea"
                            className="input"
                            onChange={this.handleNameChange}
                            value={this.state.name}
                            type="text"
                            placeholder="Name"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            value={this.state.description}
                            placeholder="Assessment Description"
                            onChange={this.handleDescriptionChange}
                            type="text"
                            ref="nameTextArea">
                            </textarea>
                    </div>
                </div>
                <div className="button" onClick={this.updateCourse.bind(this)}>
                    Update Course
                </div>
            </div>
        )
    }
}

export default CourseEdit