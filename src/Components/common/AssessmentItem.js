import { Jumbotron, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { toast } from 'react-toastify'
import moment from 'moment'
import React from 'react'
import axios from 'axios'
import SubmissionItem from './SubmissionItem'

class AssessmentItem extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
        }

    }
    render () {
        return (
            <div>
                <ListGroup>
                    {
                        this.props.items.map(function (assessment) {
                            return <ListGroupItem
                                header={assessment.name}
                                href={'/assessments/' + assessment.id}>
                                Created {moment(assessment.created_at).calendar()}
                                <SubmissionItem items={assessment.submissions}/>
                            </ListGroupItem>
                        })
                    }
                </ListGroup>
            </div>

        )
    }
}

export default AssessmentItem