import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Events from './../../client.js'
import moment from 'moment'
import React from 'react'

class SubmissionItem extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    componentDidMount () {
        Events.on('onUserRetrieved', (user) => {
            this.setState({user: user})
            console.log(user)
        })
    }

    render () {
        return (
            <div>
                <ListGroup>
                    {
                        this.props.items.map((submission) => {
                            return <div>
                                {submission.user == this.state.user.id ? (
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