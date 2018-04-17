/*
Assessment view.

@TeamAlpha 2018
CodeMarker
*/

import { Jumbotron, ListGroup, ListGroupItem, Col } from 'react-bootstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import AssessmentEdit from '../Components/assessment/AssessmentEdit'
import { ClimbingBoxLoader } from 'react-spinners'
import ReactMarkdown from 'react-markdown'
import Report from '../Components/Report'
import { toast } from 'react-toastify'
import Dropzone from 'react-dropzone'
import Dropdown from 'react-dropdown'
import Routes from './../Api/routes'
import Events from './../client.js'
import moment from 'moment'
import React from 'react'
import axios from 'axios'

class Assessment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editModal: false,
            uploading: false,
            submissions: [],
            loading: false,
            assessment: {},
            submission: {},
            modal: false,
            language: '',
            users: [],
            possibleLanguages: [],
            user: {
                id: '',
                is_superuser: false,
                is_staff: false
            }
        }
    }

    getUserAndUsersAndAssessment() {
        axios.post(Routes.auth.get_user)
            .then((response) => {
                return response.data
            })
            .then((response) => {
                this.setState({user: response})
                this.getUsersAndAssessment();

            })
            .catch(error => {
                console.log('error: ', error)
            })
    }

    filterSubmissions (submissions) {
        let self = this
        if (!self.state.user.is_staff && !self.state.user.is_superuser) {
            submissions = submissions.filter(function (submission) {
                return submission.user == self.state.user.id
            })
        }
        this.setState({submissions: submissions})
    }

    getAssessment(id) {
        let url = Routes.assessments + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({assessment: json})
                Events.emit('onAssessmentRetrieved', json)
                this.filterSubmissions(json.submissions)
                this.setState({possibleLanguages: JSON.parse(json.languages.replace(/'/g, '"'))})

                if (this.state.possibleLanguages.includes('CPlus')) {
                    let index = this.state.possibleLanguages.indexOf('CPlus')
                    this.state.possibleLanguages.splice(index, 1, 'C++')
                }
            })
    }

    toggleModal() {
        this.setState({modal: !this.state.modal})
    }

    toggleEditModal() {
        this.setState({editModal: !this.state.editModal})
    }

    onDrop(files) {
        this.setState({ modal: true })
        this.setState({ loading: true })
        this.setState({ uploading: true })

        const options = {
            'Python2': 'python2',
            'Python3': 'python3',
            'Java': 'java',
            'Ruby': 'ruby',
            'C++': 'cpp',
            'C': 'c'
        }

        let formData = new FormData()
        formData.append('assessment_id', this.state.assessment.id)
        formData.append('language', options[this.state.language])
        formData.append('submission', files[0])

        if (moment(this.state.assessment.deadline).isBefore(moment())) {
            toast('Submitting assessment late...')
            formData.append('late', 1)
        } else {
            formData.append('late', 0)
        }

        let self = this
        axios.post(Routes.submissions, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                this.setState({ uploading: false })
                this.processSubmission(parseInt(response.data), 1)
            }
            )
            .catch(() => {
                self.setState({ modal: false })
                self.setState({ loading: false })
                self.setState({ uploading: false })
            })
    }

    getUsersAndAssessment () {
        let url = Routes.users + '?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({users: json})
                this.getAssessment(this.props.match.params.id)
            })
    }

    processSubmission(id) {
        let url = Routes.submissions + id + '/process/'
        axios.get(url)
            .then((json) => {
                this.setState({ submission: json.data.fields })
                this.setState({ loading: false })
                this.getAssessment(this.props.match.params.id)
            })
            .catch(() => {
                this.setState({ modal: false })
                this.setState({ loading: false })
                this.setState({ uploading: false })
            })
    }

    componentDidMount () {
        this.getUserAndUsersAndAssessment()

        Events.on('onAssessmentEditComplete', () => {
            this.getAssessment(this.props.match.params.id)
            this.setState({loading: false})
            this.setState({uploading: false})
            this.toggleEditModal()
        })
    }

    onLanguageSelected(choice) {
        this.setState({ language: choice.value })
    }

    headerText (submission) {
        if (submission.late) {
            return 'Late ' + submission.result + ' by ' + this.state.users.filter(user => user.id == submission.user)[0].username + ' (' + submission.marks + ')'
        }
        return submission.result + ' by ' + this.state.users.filter(user => user.id == submission.user)[0].username + ' (' + submission.marks + ')'
    }

    render() {
        const options = this.state.assessment.languages
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
                    <h1>{this.state.assessment.name}</h1>
                    <br/>
                    <p>{this.state.assessment.description}</p>

                    {this.state.user.is_staff || this.state.user.is_superuser ? (
                        <div>
                            {this.state.submissions != null ? (
                                <p>This assessment has {this.state.submissions.length} submissions.</p>
                            ) : null}
                        </div>
                    ) : <div>
                        {this.state.submissions != null ? (
                            <p>You have {this.state.submissions.length} submissions to this assessment.</p>
                        ) : null}
                    </div>}

                    <p>Deadline: {moment(this.state.assessment.deadline).utc().format('YYYY-MM-DD HH:mm')}</p>

                    {this.state.user.is_staff || this.state.user.is_superuser ? (
                        <div className="bd-tw-button button" onClick={this.toggleEditModal.bind(this)}>
                            Edit Assessment
                        </div>
                    ) : null}

                </Jumbotron>

                <div className="modal">
                    <div className="modal-background" />
                    <div className="modal-content">
                    </div>
                    <button className="modal-close is-large" aria-label="close" />
                </div>

                <Col sm={6}>
                    <div className="content description">
                        <h3>Additional Help</h3>
                        <p> <ReactMarkdown source={this.state.assessment.additional_help} /></p>
                        <p>Created {moment(this.state.assessment.created_at).calendar()}</p>
                        <p>Updated {moment(this.state.assessment.updated_at).calendar()}</p>
                        <h2>Upload File</h2>
                        <Dropdown
                            className="dropDown"
                            options={this.state.possibleLanguages}
                            onChange={this.onLanguageSelected.bind(this)}
                            value={this.state.language}
                            placeholder="Select Language" />
                        <br />

                        <div className="dropzone">
                            <Dropzone onDrop={this.onDrop.bind(this)}>
                                <h2>Click or drop file here</h2>
                            </Dropzone>
                        </div>
                        <br />

                    </div>
                </Col>

                <Col sm={6}>
                    <div className='sweet-loading'>

                    </div>
                    <div className="content">
                        <h2>Submissions</h2>
                        <ListGroup>
                            {
                                this.state.submissions.map(function (submission) {
                                    return <ListGroupItem
                                        header={this.headerText(submission)}
                                        href={'/submissions/' + submission.id}>Created {moment(submission.created_at).calendar()}</ListGroupItem>
                                }.bind(this))
                            }
                        </ListGroup>
                    </div>
                </Col>

                <div className={'modal ' + (this.state.modal ? 'is-active' : '')}>
                    <div className="modal-background" />
                    <div className="modal-card">

                        <header className="modal-card-head">
                            <p className="modal-card-title">Report</p>
                            <button className="delete" onClick={this.toggleModal.bind(this)}
                                aria-label="close" />
                        </header>

                        <section className="modal-card-body">
                            {this.state.uploading ? (
                                <h2>Uploading...</h2>
                            ) : null}
                            {this.state.loading ? (
                                <h2>Running your code...</h2>
                            ) : null}
                            {this.state.loading ? (
                                <ClimbingBoxLoader style="text-align: center;"
                                    loading={this.state.loading}
                                />
                            ) : <Report submission={this.state.submission} />}
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={this.toggleModal.bind(this)}>Close</button>
                        </footer>
                    </div>
                </div>

                <div className={'modal ' + (this.state.editModal ? 'is-active' : '')}>
                    <div className="modal-background"/>
                    <div className="modal-card">

                        <header className="modal-card-head">
                            <p className="modal-card-title">Edit Assessment</p>
                            <button className="delete" onClick={this.toggleEditModal.bind(this)}
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
                                <AssessmentEdit assessment={this.state.assessment}/>
                            ) : null}
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={this.toggleEditModal.bind(this)}>Close</button>
                        </footer>
                    </div>
                </div>

            </ReactCSSTransitionGroup>
        )
    }
}

const style = {
    margin: 'auto'
}

export default Assessment