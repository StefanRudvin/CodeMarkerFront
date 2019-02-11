import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import AssessmentItem from '../Components/common/AssessmentItem'
import { Jumbotron, Col } from 'react-bootstrap'
import UserChart from './../Components/UserChart'
import { Link } from 'react-router-dom'
import Dropdown from 'react-dropdown'
import { toast } from 'react-toastify'
import Routes from './../Api/routes'
import Events from './../client.js'
import swal from 'sweetalert2'
import moment from 'moment'
import React from 'react'
import axios from 'axios'

class User extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            currentUser: {
                is_staff: false,
                is_superuser: false
            },
            selectedCourse: '',
            allCoursesAr: [],
            show_late: true,
            is_staff: false,
            submissions: [],
            allCourses: [],
            loading: false,
            username: '',
            courses: [],
            email: '',
            password: '',
            user: [],
            id: '',
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    componentDidMount () {
        this.getCurrentUser()
        this.getUser(this.props.match.params.id)
        this.getAllCourses()

        Events.on('onCoursesChanged', () => {
            this.getUser(this.props.match.params.id)
            this.getAllCourses()
        })

        Events.on('onCourseSelected', (course) => {
            this.setState({selectedCourse: course})
        })
    }

    toggleStaff () {
        this.setState({is_staff: !this.state.is_staff})
    }

    toggleShowLate () {
        this.state.show_late ? Events.emit('onShowLateFalse') : Events.emit('onShowLateTrue')
        this.setState({show_late: !this.state.show_late})
    }

    handleUsernameChange (e) {
        this.setState({username: e.target.value})
    }

    handleEmailChange (e) {
        this.setState({email: e.target.value})
    }

    handlePasswordChange (e) {
        this.setState({password: e.target.value})
    }

    getCurrentUser () {
        axios.post(Routes.auth.get_user)
            .then((response) => {
                return response.data
            })
            .then((response) => {
                this.setState({currentUser: response})
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }

    getUser (id) {
        axios.get(Routes.users + id + '/?format=json')
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({user: json})
                this.setState({username: this.state.user.username})
                this.setState({is_staff: this.state.user.is_staff})
                this.setState({email: this.state.user.email})
                this.setState({password: this.state.user.password})
                this.setState({submissions: json.submissions})
                this.setState({courses: json.courses})
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

    updateUser () {
        this.setState({loading: true})

        let formData = new FormData()

        formData.append('username', this.state.username)
        formData.append('is_staff', this.state.is_staff)
        formData.append('email', this.state.email)
        formData.append('password', this.state.password)
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
            text: 'You can add the user back with the dropdown below.',
            confirmButtonText: 'Yes, delete it!',
            confirmButtonClass: 'confirm-class',
            cancelButtonClass: 'cancel-class',
            title: 'Are you sure?',
            showCancelButton: true,
            closeOnConfirm: false,
            closeOnCancel: false,
            type: 'warning',

        }).then((result) => {
            if (result.value) {

                axios.post(Routes.courses_users_delete, formData)
                    .then((response) => {
                        toast('User removed from course')
                        Events.emit('onCoursesChanged')
                    })
            }
        })

    }

    getAverageSubmissionScore (assessments) {
        let ScoreNum = 0
        let ScoreTotal = 0

        let self = this

        assessments.forEach(function (assessment) {
            let bestSubmission = 0
            assessment.submissions.forEach((submission) => {
                if (self.state.show_late) {
                    if (submission.marks >= bestSubmission && submission.user == self.state.user.id) {
                        bestSubmission = submission.marks
                    }
                } else {
                    if (submission.marks >= bestSubmission && submission.user == self.state.user.id && !submission.late) {
                        bestSubmission = submission.marks
                    }
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
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionAppear={true}
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

                    <div className="field">
                        <div className="control user-checkbox">
                            <label className="label">Show Late Submissions</label>
                            <input
                                name="Show Late"
                                type="checkbox"
                                checked={this.state.show_late}
                                onChange={this.toggleShowLate.bind(this)}/>
                        </div>
                    </div>
                </Jumbotron>
                {
                    this.state.currentUser.is_superuser || this.state.currentUser.is_staff ? <Col sm={4}>
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
                                <label className="label">Password</label>
                                <div className="control">
                                    <input
                                        ref="nameTextArea"
                                        className="input"
                                        onChange={this.handlePasswordChange}
                                        value={this.state.password}
                                        type="text"
                                        placeholder="User Password"/>
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
                        : null
                }

                {
                    this.state.currentUser.is_superuser || this.state.currentUser.is_staff ? <Col sm={8}>
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
                        : <Col sm={12}>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Course Name</th>
                                    <th>Average Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.courses.map(course => (
                                    <tr>
                                        <td>{course.id}</td>
                                        <td><Link to={'/courses/' + course.id}>{course.name}</Link></td>
                                        <td>{this.getAverageSubmissionScore(course.assessments)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Col>
                }

                <Col sm={12}>
                    <UserChart/>
                </Col>

                <Col sm={12}>
                    <div className="content">
                        {this.state.selectedCourse ? (
                            <div>
                                <h2>Activity</h2>
                                <AssessmentItem items={this.state.selectedCourse.assessments}/>
                            </div>
                        ) : null}
                    </div>
                </Col>
            </ReactCSSTransitionGroup>
        )
    }
}

export default User
