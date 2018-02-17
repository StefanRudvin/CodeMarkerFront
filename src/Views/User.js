import { Jumbotron, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Routes from './../Api/routes'
import moment from 'moment'
import React from 'react'
import axios from 'axios'

class User extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            is_staff: false,
            user: [],
            courses: [],
            submissions: [],
            id: '',
            loading: false
        }

        this.props.history.listen((location, action) => {
            let id = location.pathname.slice(9)
            this.setState({id: id})
            this.getUser(id)
        })

        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
    }

    toggleStaff () {
        this.setState({is_staff: !this.state.is_staff})
    }

    handleUsernameChange (e) {
        this.setState({username: e.target.value})
    }

    handleEmailChange (e) {
        this.setState({email: e.target.value})
    }

    getUser (id) {
        axios.get(Routes.users + id + '/?format=json')
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({user: json})
                this.setState({username: this.state.user.username})
                this.setState({email: this.state.user.email})
                this.setState({is_staff: this.state.user.is_staff})
                this.setState({courses: json.courses})
                this.setState({submissions: json.submissions})
            })
    }

    updateUser () {
        this.setState({loading: true})

        let formData = new FormData()

        formData.append('username', this.state.username)
        formData.append('is_staff', this.state.is_staff)
        formData.append('email', this.state.email)
        formData.append('id', this.state.user.id)

        let self = this
        axios.put(Routes.users + this.state.user.id + '/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                    self.setState({loading: false})
                    self.getUser(this.state.user.id)
                    toast("User updated");
                }
            )
    }

    componentDidMount () {
        this.getUser(this.props.match.params.id)
    }

    render () {
        return (
            <div>
                <Jumbotron>
                    <h1>Edit User</h1>
                    <br/>
                    <p>
                        Joined {moment(this.state.user.date_joined).calendar()},
                        takes part in {this.state.courses.length} courses
                        and has submitted {this.state.submissions.length} times.
                    </p>
                </Jumbotron>

                <Col sm={4}>
                    <div className="content">
                        <h2>User Information</h2>
                        <label className="label">UserName</label>
                        <div className="control">
                            <input
                                ref="nameTextArea"
                                className="input"
                                onChange={this.handleUsernameChange}
                                value={this.state.username}
                                type="text"
                                placeholder="Username"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input
                                ref="nameTextArea"
                                className="input"
                                onChange={this.handleEmailChange}
                                value={this.state.email}
                                type="text"
                                placeholder="User Email"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Staff</label>
                        <div className="control">
                            <input
                                name="Is staff"
                                type="checkbox"
                                checked={this.state.is_staff}
                                onChange={this.toggleStaff.bind(this)}/>
                        </div>
                    </div>
                    <div className="button" onClick={this.updateUser.bind(this)}>
                        Update User
                    </div>

                </Col>

                <Col sm={4}>
                    <div className="content">
                        <h2>Courses</h2>
                        <ListGroup>
                            {
                                this.state.courses.map(function (course) {
                                    return <ListGroupItem
                                        header={course.name}
                                        href={'/courses/' + course.id}>
                                        Created {moment(course.created_at).calendar()}
                                        </ListGroupItem>
                                })
                            }
                        </ListGroup>
                    </div>
                </Col>

                <Col sm={4}>
                    <div className="content">
                        <h2>Submissions</h2>
                        <ListGroup>
                            {
                                this.state.submissions.map(function (course) {
                                    return <ListGroupItem
                                        header={course.marks + ' marks'}
                                        href={'/courses/' + course.id}>
                                            Created {moment(course.created_at).calendar()}
                                        </ListGroupItem>
                                })
                            }
                        </ListGroup>
                    </div>
                </Col>
                <br/>
            </div>
        )
    }
}

export default User