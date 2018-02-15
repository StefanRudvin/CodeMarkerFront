import ConfigurableTable from './../Components/common/ConfigurableTable.js'
import logo from './../Assets/CodeMarkerLogo.png'
import React from 'react'
import axios from 'axios'
import { Jumbotron } from 'react-bootstrap'
import Routes from './../Api/routes'
import Auth from './../Api/auth'

class Admin extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            courses: [],
            name: '',
            description: '',
            id: '',
            updated_at: ''
        }

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getCourses () {

        axios.get(Routes.get.courses)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({courses: json})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidMount () {
        this.getCourses()
    }

    render () {
        return (
            <div className="admin">

                <Jumbotron>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Admin Page</h1>
                    <br/>
                    <p className="App-intro">
                        Here you can administrate courses and assignments.
                    </p>
                </Jumbotron>

                <h3>Courses</h3>
                <ConfigurableTable
                    items={this.state.courses}
                    link="courses"
                    tableHeader="Course Name"
                    tableDescription="Course Description"
                />

                <div className="content">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input
                                className="input"
                                onChange={this.handleNameChange}
                                value={this.state.name}
                                type="text"
                                placeholder="Course Name"/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <textarea
                                className="textarea"
                                onChange={this.handleDescriptionChange}
                                value={this.state.description}
                                placeholder="Course Description">
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

    handleSubmit (e) {
        e.preventDefault()
        console.log('Handle submit!')
        const newCourse = {
            name: this.state.name,
            description: this.state.description,
            id: this.state.courses.length + 1,
            updated_at: Date.now()
        }
        this.addCourse()
        this.setState((prevState) => ({
            courses: prevState.courses.concat(newCourse),
            description: '',
            updated_at: '',
            name: '',
            id: '',
        }))
    }

    addCourse () {
        let formData = new FormData()

        formData.append('name', this.state.name)
        formData.append('description', this.state.description)
        formData.append('user', 1)
        axios.post(Routes.post.courses, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            this.getCourses()
        })
    }

}

export default Admin
