import { Jumbotron, ListGroup, ListGroupItem, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Routes from './../Api/routes'
import Auth from './../Api/auth'
import moment from 'moment'
import React from 'react'
import axios from 'axios'

class Course extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            course: {
                'assessments': [],
                'students': []
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
        let url = Routes.courses + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
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
                    <p>{this.state.course.students.length} students attending</p>
                    <small>Created {moment(this.state.course.created_at).calendar()}</small>
                    <br/>
                    <small>Updated {moment(this.state.course.updated_at).calendar()}</small>
                    <br/>
                    <br/>
                    {Auth.isStaff() ? (
                        <a className="bd-tw-button button" href={'/assessment/' + this.state.course.id + '/new'}>
                            New Assessment
                        </a>
                    ) : null}

                </Jumbotron>

                <div className="content">
                    <h2>Assessments</h2>
                    <ListGroup>
                        {
                            this.state.course.assessments.map(function (assessment) {
                                return <ListGroupItem header={assessment.name} href={'/assessments/' + assessment.id}>Created {moment(assessment.created_at).calendar()}</ListGroupItem>
                            })
                        }
                    </ListGroup>
                </div>

            </div>
        )
    }

}

export default Course