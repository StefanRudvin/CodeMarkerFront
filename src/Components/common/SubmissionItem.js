import { Jumbotron, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { toast } from 'react-toastify'
import moment from 'moment'
import React from 'react'
import axios from 'axios'
import UserActions from '../../Services/User/UserActions'

class SubmissionItem extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            user_id: UserActions.getUser().id
        }
    }

    render () {
        return (
            <div>
                <ListGroup>
                    {
                        this.props.items.map(function (submission) {
                            return <div>
                                {submission.user == this.state.user_id ? (
                                    <ListGroupItem
                                        header={'Late: ' + submission.late + ' Marks: ' + submission.marks}
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