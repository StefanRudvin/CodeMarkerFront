import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Jumbotron } from 'react-bootstrap'
import Routes from './../Services/Routes'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

class Submission extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: true,
            user: {},
            submission: {}
        }

        this.handleMarksChange = this.handleMarksChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getSubmission (id) {
        let url = Routes.submissions + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({submission: json})
                this.getUser(json.user)
            })
    }

    getUser (id) {
        let url = Routes.users + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({user: json})
                this.loading = false
            })
    }

    componentDidMount () {
        this.getSubmission(this.props.location.pathname.slice(13))
    }

    toggleLateness () {
        let submissionCopy = this.state.submission
        submissionCopy.late = !submissionCopy.late
        this.setState({submission: submissionCopy})
    }

    handleMarksChange (e) {
        let submissionCopy = this.state.submission
        submissionCopy.marks = e.target.value
        this.setState({submission: submissionCopy})
    }

    handleSubmit (e) {
        e.preventDefault()
        let formData = new FormData()
        formData.append('marks', this.state.submission.marks)
        formData.append('late', this.state.submission.late)

        axios.patch(Routes.submissions +this.state.submission.id + '/', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                    toast("Submission updated")
                }
            )
            .catch(function (error) {
            })
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
                    <h1>Submission by: {this.state.user.username}</h1>
                    <br/>
                    <h1>Result: {this.state.submission.result}</h1>
                </Jumbotron>

                <div className="content well submission">

                        <div>
                            <h3>Mark</h3>
                            <input
                                className="input"
                                onChange={this.handleMarksChange}
                                value={this.state.submission.marks}
                                type="text"
                                placeholder="Submission Mark"/>
                        </div>

                        <h3>Language: {this.state.submission.language}</h3>
                        <h3>Status: {this.state.submission.status}</h3>
                        <h3>Time Taken: {this.state.submission.timeTaken}s</h3>
                        <div>

                            <h3>Late: <input
                                name="Lateness"
                                type="checkbox"
                                checked={this.state.submission.late}
                                onChange={this.toggleLateness.bind(this)}/> </h3>

                        </div>

                        <h3>More info: {this.state.submission.info}</h3>

                        <div className="button" onClick={this.handleSubmit}>
                            Submit
                        </div>
                </div>
            </ReactCSSTransitionGroup>
        )
    }

}

export default Submission