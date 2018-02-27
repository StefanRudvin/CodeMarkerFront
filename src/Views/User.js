import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CourseItem from '../Components/common/CourseItem'
import { Jumbotron, Col } from 'react-bootstrap'
import UserChart from './../Components/UserChart'
import { Link } from 'react-router-dom'
import Dropdown from 'react-dropdown'
import { toast } from 'react-toastify'
import Routes from './../Api/routes'
import Events from './../client.js'
import moment from 'moment'
import React from 'react'
import axios from 'axios'
import swal from 'sweetalert2'

class User extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            allCoursesAr: [],
            is_staff: false,
            submissions: [],
            allCourses: [],
            loading: false,
            username: '',
            courses: [],
            email: '',
            user: [],
            id: '',
        }

        this.props.history.listen((location, action) => {
            let id = location.pathname.slice(9)
            this.setState({id: id})
            this.getUser(id)
        })

        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
    }

    componentDidMount () {
        this.getUser(this.props.match.params.id)
        this.getAllCourses()
        let self = this

        Events.on('onCoursesChanged', () => {
            this.getUser(this.props.match.params.id)
            this.getAllCourses()
        })
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
                localStorage.user_id = response.data.id
                return response.data
            })
            .then((json) => {
                this.setState({user: json})
                this.setState({username: this.state.user.username})
                this.setState({email: this.state.user.email})
                this.setState({is_staff: this.state.user.is_staff})
                this.setState({courses: json.courses})
                this.setState({submissions: json.submissions})
                Events.emit('onUserRetrieved', json)
            })
    }

    getAllCourses () {
        axios.get(Routes.courses_json)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({allCourses: json})
                let coursesAr = []

                let courseIds = this.state.courses.map(course => course.id)

                json.forEach(function (course) {
                    if (!courseIds.includes(course.id)) {
                        coursesAr.push(course.name)
                    }
                })
                this.setState({allCoursesAr: coursesAr})
            })
    }

    onCourseSelected (choice) {
        let formData = new FormData()

        let course = this.state.allCourses.filter(function (course) {
            return course.name === choice.value
        })[0]

        formData.append('course_id', course.id)
        formData.append('user_id', this.state.user.id)

        axios.post(Routes.courses_users_add, formData)
            .then((response) => {
                    toast('User added to course')
                    Events.emit('onCoursesChanged')
                }
            )
    }

    componentWillUnmount () {
        delete localStorage.user_id
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
                    self.getUser(self.state.user.id)
                    toast('User updated')
                }
            )
    }

    removeUserFromCourse (course_id) {
        let formData = new FormData()
                
            formData.append('course_id', course_id)
            formData.append('user_id', this.state.user.id)

            //deleting warning
        swal({
            title: 'Are you sure?',
            text: 'You can add the user back with the dropdown below.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonClass: 'confirm-class',
            cancelButtonClass: 'cancel-class',
            closeOnConfirm: false,
            closeOnCancel: false

        }).then((result) => {
            if (result.value){
                
            let self = this
                axios.post(Routes.courses_users_delete, formData)
                .then((response) => {
                        toast('User removed from course')
                        Events.emit('onCoursesChanged')
                })
            }})
     
    }
    

    getAverageSubmissionScore (assessments) {
        let ScoreNum = 0
        let ScoreTotal = 0

        assessments.forEach(function (assessment) {
            let bestSubmission = 0
            assessment.submissions.forEach(function (submission) {
                if (submission.marks >= bestSubmission) {
                    bestSubmission = submission.marks
                }
            })
            if (assessment.submissions.length > 0) {
                ScoreTotal += bestSubmission
                ScoreNum++
            }
        })

        if (ScoreNum === 0) {
            return 0
        }

        return ScoreTotal / ScoreNum
    }

    render () {
        return (
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionName="SlideIn"
                className="transition-item">
                <Jumbotron>
                    <h1>User Profile</h1>
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
                        <div className="control user-checkbox">
                            <label className="label">Staff</label>
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

                <Col sm={8}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Course Name</th>
                            <th>Average Score</th>
                            <th>Remove user from course</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.courses.map(course => (
                            <tr>
                                <td>{course.id}</td>
                                <td><Link to={'/courses/' + course.id}>{course.name}</Link></td>
                                <td>{this.getAverageSubmissionScore(course.assessments)}</td>
                                <td><a className="button"
                                       onClick={() => this.removeUserFromCourse(course.id)}>Remove</a></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <h1>Add user to course</h1>
                    <br/>
                    <Dropdown
                        className="dropDown"
                        options={this.state.allCoursesAr}
                        onChange={this.onCourseSelected.bind(this)}
                        value={this.state.language}
                        placeholder="Select Course"/>
                    <br/>
                </Col>
                <Col sm={12}>
                    <UserChart/>
                </Col>

                <Col sm={12}>
                    <div className="content">
                        <h2>Activity</h2>
                        <CourseItem items={this.state.courses} user={this.state.user}/>
                    </div>
                </Col>
            </ReactCSSTransitionGroup>
        )
    }
}

export default User