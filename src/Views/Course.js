import { Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap'
import React from 'react'
import axios from 'axios'
import moment from 'moment'

class Course extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            course: {
                'assessments': []
            },
            name: '',
            description: '',
            additional_help: '',
        }
        this.props.history.listen((location, action) => {
            let id = location.pathname.slice(9)
            this.getCourse(id)
        })

    }

    getCourse (id) {
        let url = 'http://127.0.0.1:8000/api/courses/' + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                console.log(json)
                this.setState({course: json})
            })
    }

    componentDidMount () {
        this.getCourse(this.props.match.params.id)
    }

    render () {
        return (
            <div>
                <Jumbotron>
                    <h1>{this.state.course.name}</h1>
                    <p>{this.state.course.description}</p>
                    <small>Created {moment(this.state.course.created_at).calendar()}</small>
                    <br/>
                    <small>Updated {moment(this.state.course.updated_at).calendar()}</small>
                    <br/>
                    <br/>
                    <a class="bd-tw-button button" href={"/assessment/" + this.state.course.id + "/new"}>
                        New Assessment
                    </a>
                </Jumbotron>

                <div className="content">
                    <h2>Assessments</h2>
                    <ListGroup>
                        {
                            this.state.course.assessments.map(function (assessment) {
                                return <ListGroupItem header={assessment.name} href={'/assessments/' + assessment.id}>Created {moment(assessment.created_at).calendar() }</ListGroupItem>
                            })
                        }
                    </ListGroup>
                </div>

            </div>
        )
    }

}

export default Course