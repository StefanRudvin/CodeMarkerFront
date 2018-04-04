import { ListGroup, ListGroupItem } from 'react-bootstrap'
import SubmissionItem from './SubmissionItem'
import moment from 'moment'
import React from 'react'

class AssessmentItem extends React.Component {

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