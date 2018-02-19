import { Jumbotron } from 'react-bootstrap'
import React from 'react'
import axios from 'axios'
import Routes from './../Api/routes'

class Submission extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            user: {},
            submission: {}
        }
    }

    getSubmission(id) {
        let url = Routes.submissions + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({ submission: json })
                this.getUser(json.user)
            })
    }

    getUser(id) {
        let url = Routes.users + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({ user: json })
                this.loading = false
            })
    }

    componentDidMount() {
        this.getSubmission(this.props.location.pathname.slice(13))
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Submission by: {this.state.user.username}</h1>
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