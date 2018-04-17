/*
Course View.

@TeamAlpha 2018
CodeMarker
*/

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap'
import CourseEdit from '../Components/Course/CourseEdit'
import Col from 'react-bootstrap/es/Col'
import Routes from './../Api/routes'
import Events from './../client.js'
import moment from 'moment'
import React from 'react'
import axios from 'axios'

class Course extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            additional_help: '',
            uploading: false,
            description: '',
            loading: false,
            modal: false,
            name: '',
            course: {
                'assessments': [],
                'students': []
            },
            submissionCount: 0,
            submissionFailCount: 0,
            submissionPassCount: 0,
            submissionAverageMark: 0,
            user: {
                is_superuser: false,
                is_staff: false,
                username: ''
            }
        }
    }

    componentDidMount () {
        this.getUserAndCourse()

        Events.on('onCourseEditComplete', () => {
            this.setState({loading: false})
            this.setState({uploading: false})
            this.toggleModal()
        })

        Events.on('onCoursesChanged', () => {
            this.getCourse()
        })
    }

    getCourse () {
        let url = Routes.courses + this.props.match.params.id + '/?format=json'
        let self = this
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                let assessments = json.assessments

                if (!self.state.user.is_staff && !self.state.user.is_superuser) {
                    assessments.forEach(function (assessment) {
                        assessment.submissions = assessment.submissions.filter(function(submission) {
                            return submission.user == self.state.user.id
                        })
                    })
                }
                json.assessments = assessments

                this.setState({course: json})
                Events.emit('onCourseRetrieved', json)
                this.getSubmissionStats()
            })
            .catch(error => {
                console.log(error)
            })
    }

    getUserAndCourse() {
        axios.post(Routes.auth.get_user)
            .then((response) => {
                return response.data
            })
            .then((response) => {
                this.setState({user: response})
                this.getCourse()
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }

    getSubmissionStats () {
        let submissionCount = 0
        let submissionFailCount = 0
        let submissionPassCount = 0
        let totalScore = 0

        if (this.state.course.assessments != null) {
            this.state.course.assessments.forEach(assessment => {
                if (assessment.submissions == null) { return }
                assessment.submissions.forEach(submission => {
                    if (submission.result == 'pass') {
                        totalScore += submission.marks
                        submissionPassCount++
                    } else {
                        submissionFailCount++
                    }
                    submissionCount++
                })
            })
        }

        this.setState({submissionCount: submissionCount})
        this.setState({submissionFailCount: submissionFailCount})
        this.setState({submissionPassCount: submissionPassCount})
        this.setState({submissionAverageMark: totalScore / submissionPassCount})
    }

    toggleModal () {
        if (this.state.modal) {
            this.setState({modal: false})
            this.setState({uploading: false})
        } else {
            this.setState({modal: true})
        }
    }

    editModal () {
        this.setState({modal: true})
        this.setState({loading: true})
        this.setState({uploading: true})
    }

    render () {
        return (
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionName="SlideIn"
                className="transition-item"
            >
                <Jumbotron>
                    <h1>{this.state.course.name}</h1>
                    <p>{this.state.course.description}</p>
                    <p>{this.state.course.students.length} student(s) attending</p>
                    <small>Created {moment(this.state.course.created_at).calendar()}</small>
                    <br/>
                    <small>Updated {moment(this.state.course.updated_at).calendar()}</small>
                    <br/>
                    <br/>
                    {this.state.user.is_staff || this.state.user.is_superuser ? (
                        <a className="bd-tw-button button" href={'/assessment/' + this.state.course.id + '/new'}>
                            New Assessment
                        </a>
                    ) : null}
                    {this.state.user.is_staff || this.state.user.is_superuser ? (
                        <div className="bd-tw-button button" onClick={this.editModal.bind(this)}>
                            Edit Course
                        </div>
                    ) : null}
                </Jumbotron>

                <div className={'modal ' + (this.state.modal ? 'is-active' : '')}>
                    <div className="modal-background"/>
                    <div className="modal-card">

                        <header className="modal-card-head">
                            <p className="modal-card-title">Edit Course</p>
                            <button className="delete" onClick={this.toggleModal.bind(this)}
                                    aria-label="close"/>
                        </header>

                        <section className="modal-card-body">
                            {this.props.uploading ? (
                                <h2>Uploading...</h2>
                            ) : null}
                            {this.props.loading ? (
                                <h2>Loading...</h2>
                            ) : null}
                            {!this.props.loading ? (
                                <CourseEdit course={this.state.course}/>
                            ) : null}
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={this.toggleModal.bind(this)}>Close</button>
                        </footer>
                    </div>
                </div>

                <Col sm={12}>
                    <div className="content">
                        <h2>Overview</h2>
                        <p>This course has {this.state.course.assessments.length} assessments
                            and {this.state.submissionCount} submissions. {this.state.submissionPassCount} submissions
                            passed with an average of {this.state.submissionAverageMark.toFixed(2)} marks
                            and {this.state.submissionFailCount} failed. </p>
                        <br/>
                    </div>
                </Col>

                <Col sm={12}>
                    <div className="content">
                        <h2>Assessments</h2>
                        <ListGroup>
                            {
                                this.state.course.assessments.map(function (assessment) {
                                    return <ListGroupItem
                                        header={assessment.name}
                                        href={'/assessments/' + assessment.id}>{assessment.submissions.length} submissions, Created {moment(assessment.created_at).calendar()}
                                    </ListGroupItem>
                                })
                            }
                        </ListGroup>
                    </div>
                </Col>
            </ReactCSSTransitionGroup>
        )
    }

}

export default Course