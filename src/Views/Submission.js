import { Jumbotron } from 'react-bootstrap'
import React from 'react'
import axios from 'axios'
import Routes from './../Api/routes'

class Submission extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            submission: {}
        }
        this.getSubmission(this.props.location.pathname.slice(13))
    }

    getSubmission(id) {
        let url = Routes.submissions + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({ submission: json })
                this.loading = false
            })
    }

    componentDidMount() {
        this.getSubmission(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Submission</h1>
                    <br />
                    <h1>Result: {this.state.submission.result}</h1>
                </Jumbotron>

                <div className="content">
                    <h2>Marks: {this.state.submission.marks}</h2>
                    <h2>Content Type: {this.state.submission.content_type}</h2>
                    <h2>Status: {this.state.submission.status}</h2>
                    <h2>Time Taken: {this.state.submission.timeTaken}s</h2>
                    <h2>More info: {this.state.submission.info}</h2>
                </div>
            </div>
        )
    }

}

export default Submission