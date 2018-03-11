import { Jumbotron, ListGroup, ListGroupItem, Col } from 'react-bootstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { ClimbingBoxLoader } from 'react-spinners'
import Report from '../Components/Report'
import Dropzone from 'react-dropzone'
import Dropdown from 'react-dropdown'
import Routes from './../Services/Routes'
import moment from 'moment'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Auth from '../Services/Auth'
import UserActions from '../Services/User/UserActions'

class Assessment extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            uploading: false,
            submissions: [],
            loading: false,
            assessment: {},
            submission: {},
            modal: false,
            language: '',
            possibleLanguages: []
        }

        this.props.history.listen((location, action) => {
            let id = location.pathname.slice(9)
            this.getAssessment(id)
        })
    }

    filterSubmissions (submissions) {
        console.log(submissions)
        submissions = submissions.filter( function (submission) {
            return submission.user === UserActions.getUser().id
        })
        console.log(submissions)
        this.setState({submissions: submissions})
    }

    getAssessment (id) {
        let url = Routes.assessments + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({assessment: json})
                this.filterSubmissions(json.submissions)
                this.setState({possibleLanguages: JSON.parse(json.languages.replace(/'/g, '"'))})
                if (this.state.possibleLanguages.includes('CPlus')) {
                    let index = this.state.possibleLanguages.indexOf('CPlus')
                    this.state.possibleLanguages.splice(index, 1, 'C++')
                }
            })
    }

    toggleModal () {
        if (this.state.modal) {
            this.setState({modal: false})
        } else {
            this.setState({modal: true})
        }
    }

    onDrop (files) {
        this.setState({modal: true})
        this.setState({loading: true})
        this.setState({uploading: true})

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
                    this.setState({uploading: false})
                    this.processSubmission(parseInt(response.data), 1)
                }
            )
            .catch(() => {
                self.setState({modal: false})
                self.setState({loading: false})
                self.setState({uploading: false})
            })
    }

    processSubmission (id) {
        let url = Routes.submissions + id + '/process/'
        axios.get(url)
            .then((json) => {
                this.setState({submission: json.data.fields})
                this.setState({loading: false})
                this.getAssessment(this.props.match.params.id)
            })
            .catch(() => {
                this.setState({modal: false})
                this.setState({loading: false})
                this.setState({uploading: false})
            })
    }

    componentDidMount () {
        this.getAssessment(this.props.match.params.id)
    }

    onLanguageSelected (choice) {
        this.setState({language: choice.value})
    }

    render () {
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
                    {Auth.isStaff() ? (
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



                    <p>Deadline: {moment(this.state.assessment.deadline).calendar()}</p>

                </Jumbotron>

                <div className="modal">
                    <div className="modal-background"/>
                    <div className="modal-content">
                    </div>
                    <button className="modal-close is-large" aria-label="close"/>
                </div>

                <Col sm={6}>
                    <div className="content">
                        <h3>Additional Help</h3>
                        <p>{this.state.assessment.additional_help}</p>
                        <p>Created {moment(this.state.assessment.created_at).calendar()}</p>
                        <p>Updated {moment(this.state.assessment.updated_at).calendar()}</p>
                        <h2>Upload File</h2>
                        <Dropdown
                            className="dropDown"
                            options={this.state.possibleLanguages}
                            onChange={this.onLanguageSelected.bind(this)}
                            value={this.state.language}
                            placeholder="Select Language"/>
                        <br/>

                        <div className="dropzone">
                            <Dropzone onDrop={this.onDrop.bind(this)}>
                                <h2>Click or drop file here</h2>
                            </Dropzone>
                        </div>
                        <br/>

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
                                        header={submission.result + ' ' + submission.marks}
                                        href={'/submissions/' + submission.id}>Created {moment(submission.created_at).calendar()}</ListGroupItem>
                                }.bind(this))
                            }
                        </ListGroup>
                    </div>
                </Col>

                <div className={'modal ' + (this.state.modal ? 'is-active' : '')}>
                    <div className="modal-background"/>
                    <div className="modal-card">

                        <header className="modal-card-head">
                            <p className="modal-card-title">Report</p>
                            <button className="delete" onClick={this.toggleModal.bind(this)}
                                    aria-label="close"/>
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
                            ) : <Report submission={this.state.submission}/>}
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={this.toggleModal.bind(this)}>Close</button>
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