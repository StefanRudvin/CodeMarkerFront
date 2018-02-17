import { Jumbotron, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { toast } from 'react-toastify'
import moment from 'moment'
import React from 'react'
import axios from 'axios'
import AssessmentItem from './AssessmentItem'

class CourseItem extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
        }

    }
    render () {
        return (
            <Col sm={12}>
                <ListGroup>
                    {
                        this.props.items.map(function (course) {
                            return <ListGroupItem
                                header={course.name}
                                href={'/courses/' + course.id}>
                                {/*Created {moment(course.created_at).calendar()}*/}

                                <AssessmentItem items={course.assessments}/>

                            </ListGroupItem>
                        })
                    }
                </ListGroup>
            </Col>

        )
    }
}

export default CourseItem