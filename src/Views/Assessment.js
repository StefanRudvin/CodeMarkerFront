import { Jumbotron, ListGroup, ListGroupItem, Col } from 'react-bootstrap'
import { ClimbingBoxLoader } from 'react-spinners'
import Report from '../Components/Report'
import Dropzone from 'react-dropzone'
import Dropdown from 'react-dropdown'
import Routes from './../Api/routes'
import moment from 'moment'
import React from 'react'
import axios from 'axios'


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
            language: ''
        }

        this.props.history.listen((location, action) => {
            let id = location.pathname.slice(9)
            this.getAssessment(id)
        })

    }

    getAssessment (id) {
        let url = Routes.assessments + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({assessment: json})
                this.setState({submissions: json.submissions})
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
            'Java 8': 'java',
            'Ruby': 'ruby',
            'C++': 'cpp',
            'C': 'c'
        }

        let formData = new FormData()
        formData.append('assessment_id', this.state.assessment.id)
        formData.append('language', options[this.state.language])
        formData.append('submission', files[0])

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
            .catch(()=> {
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
        const options = [
            'Python2', 'Python3', 'Java 8', 'C++', 'C', 'Ruby'
        ]
        return (
            <div>
                <Jumbotron>
                    <h1>{this.state.assessment.name}</h1>
                    <br/>
                    <p>{this.state.assessment.description}</p>
                </Jumbotron>

                <div class="modal">
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
                            options={options}
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
                                    return <ListGroupItem header={submission.result}
                                                          href={'/submissions/' + submission.id}>Created {moment(submission.created_at).calendar()}</ListGroupItem>
                                })
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
                            {this.props.uploading ? (
                                <h2>Uploading...</h2>
                            ) : null}
                            {this.props.loading ? (
                                <h2>Loading...</h2>
                            ) : null}
                            {!this.props.loading ? (
                                <Report submission={this.state.submission}/>
                            ) : null}
                            {this.props.loading ? (
                                <ClimbingBoxLoader
                                    loading={this.state.loading}
                                />
                            ) : null}
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={this.toggleModal.bind(this)}>Close</button>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}

export default Assessment