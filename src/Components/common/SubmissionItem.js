import { Jumbotron, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { toast } from 'react-toastify'
import moment from 'moment'
import React from 'react'
import axios from 'axios'

class SubmissionItem extends React.Component {

    constructor (props) {
        super(props)
        this.state = {}

    }

    render () {
        return (
            <div>
                <ListGroup>
                    {
                        this.props.items.map(function (submission) {
                            return <div>
                                {submission.user == localStorage.user_id ? (
                                    <ListGroupItem
                                        header={'Submission id: ' + submission.id + ' Marks: ' + submission.marks}
                                        href={'/submissions/' + submission.id}>
                                        Created {moment(submission.created_at).calendar()}
                                    </ListGroupItem>
                                ) : null}
                            </div>
                        })
                    }
                </ListGroup>
            </div>

        )
    }
}

export default SubmissionItem