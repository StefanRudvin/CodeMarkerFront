import { Button, Jumbotron, ListGroup, ListGroupItem, Col} from 'react-bootstrap'
import React from 'react'
import axios from 'axios'

class Submission extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: true,
            submission: {}
        }
        this.props.history.listen((location, action) => {
            let id = location.pathname.slice(9)
            this.getSubmission(id)
        })
    }

    getSubmission (id) {
        let url = 'http://127.0.0.1:8000/api/submissions/' + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({submission: json})
                this.loading = false
            })
    }

    componentDidMount () {
        this.getSubmission(this.props.match.params.id)
    }

    render () {
        return (
            <div>
                <Jumbotron>
                    <p>{this.state.submission.status}</p>
                    <p>{this.state.submission.marks}</p>
                </Jumbotron>

                <Col sm={12}>
                    <p>{this.state.submission.data}</p>
                    <p>{this.state.submission.result}</p>
                </Col>

            </div>
        )
    }

}

export default Submission