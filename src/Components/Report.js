import React from 'react'
import swal from 'sweetalert2'

class Report extends React.Component {
    render() {
        return (
            <div className="content">
                <h3>Click on your submission to access more details</h3>
                <h4><b>Language:</b> {this.props.submission.language}</h4>
                <h4><b>Status: </b>{this.props.submission.status}</h4>
                <h4><b>File name: </b>{this.props.submission.filename}</h4>
                <h4><b>Time taken: </b>{this.props.submission.timeTaken}s</h4>
                <h4><b>Marks:</b> {this.props.submission.marks}</h4>
                <h4><b>Late:</b> {String(this.props.submission.late)}</h4>
                <h2><b>Result: </b>{this.props.submission.result}</h2>
            </div>
        )
    }
}

export default Report