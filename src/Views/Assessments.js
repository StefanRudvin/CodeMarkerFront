import { Button, Jumbotron, ListGroup, ListGroupItem, Col } from 'react-bootstrap'
import React from 'react'
import axios from 'axios'
import Dropzone from 'react-dropzone'

import { ClimbingBoxLoader } from 'react-spinners'
import Report from '../Components/Report'

class Assessments extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            assessment: {},
            loading: false,
            uploading: false,
            submissions: [],
            submission: {},
            modal: false
        }

        this.props.history.listen((location, action) => {
            let id = location.pathname.slice(9)
            this.getAssessment(id)
        })
    }

    getAssessment (id) {
        let url = 'http://127.0.0.1:8000/api/assessments/' + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                console.log(json)
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
        let formData = new FormData()
        formData.append('submission', files[0])
        axios.post('http://127.0.0.1:8000/api/submissions/' + this.state.assessment.id + '/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                    this.setState({uploading: false})
                    this.processSubmission(parseInt(response.data))
                }
            )
    }

    processSubmission (id) {
        let url = 'http://127.0.0.1:8000/api/submissions/' + id + '/process/'
        axios.get(url)
            .then((json) => {
                console.log(json)
                this.setState({submission: json.data.fields})
                this.setState({loading: false})
                this.getAssessment(this.props.match.params.id)
            })
    }

    componentDidMount () {
        this.getAssessment(this.props.match.params.id)
    }

    render () {
        return (
            <div>
                <Jumbotron>
                    <h1>{this.state.assessment.name}</h1>
                    <br/>
                    <p>{this.state.assessment.description}</p>
                </Jumbotron>

                <div class="modal">
                    <div class="modal-background"></div>
                    <div class="modal-content">
                    </div>
                    <button class="modal-close is-large" aria-label="close"></button>
                </div>

                <Col sm={6}>
                    <div className="content">
                        <h3>Additional Help</h3>
                        <p>{this.state.assessment.additional_help}</p>
                        <p>Created at: {this.state.assessment.created_at}</p>
                        <p>Updated at: {this.state.assessment.updated_at}</p>
                        <h2>Upload File</h2>
                        <br/>
                        <Dropzone onDrop={this.onDrop.bind(this)}>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                        <br/>
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
                                                          href={'/submissions/' + submission.id}>Created
                                        at {submission.created_at}</ListGroupItem>
                                })
                            }
                        </ListGroup>
                    </div>
                </Col>

                <div className={'modal ' + (this.state.modal ? 'is-active' : '')}>
                    <div className="modal-background"></div>
                    <div className="modal-card">

                        <header className="modal-card-head">
                            <p className="modal-card-title">Report</p>
                            <button className="delete" onClick={this.toggleModal.bind(this)}
                                    aria-label="close"></button>
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

export default Assessments