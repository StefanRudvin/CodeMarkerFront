import { Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap'
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import Routes from './../Api/routes'
import Auth from './../Api/auth'

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
        let url = Routes.get.course + id + '/?format=json'
        axios.get(url)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                //console.log(json)
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
                    {Auth.isStaff() ? (
                        <a className="bd-tw-button button" href={"/assessment/" + this.state.course.id + "/new"}>
                            New Assessment
                        </a>
                    ) : null}

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