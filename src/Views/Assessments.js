import { Button, Jumbotron, ListGroup, ListGroupItem, Col} from 'react-bootstrap'
import React from 'react'
import axios from 'axios'
import Dropzone from 'react-dropzone'

class Assessments extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            assessment: {},
            loading: true,
            submissions: []
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
                this.loading = false
            })
    }

    onDrop (files) {

        let formData = new FormData();
        formData.append("submission", files[0]);
        axios.post('http://127.0.0.1:8000/api/assessments/' + this.state.assessment.id + '/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            this.getAssessment(this.props.match.params.id)
        )
    }

    componentDidMount () {
        this.getAssessment(this.props.match.params.id)
    }



    render () {
        return (
            <div>
                <Jumbotron>
                    <h1>{this.state.assessment.name}</h1>
                    <p>{this.state.assessment.description}</p>
                </Jumbotron>

                <Col sm={6}>
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
                </Col>

                <Col sm={6}>
                    <h2>Submissions</h2>
                    <ListGroup>
                        {
                            this.state.submissions.map(function (submission) {
                                return <ListGroupItem header={submission.result} href={'/submissions/' + submission.id}>Created at {submission.created_at}</ListGroupItem>
                            })
                        }
                    </ListGroup>
                </Col>
            </div>
        )
    }
}

export default Assessments