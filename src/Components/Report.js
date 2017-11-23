import React from 'react'

class Report extends React.Component {

    render () {
        return (
            <div className="content">
                <h4><b>Content Type:</b> {this.props.submission.content_type}</h4>
                <h4><b>Status: </b>{this.props.submission.status}</h4>
                <h4><b>FileName: </b>{this.props.submission.filename}</h4>
                <h4><b>Time taken: </b>{this.props.submission.timeTaken}</h4>
                <h4><b>Marks:</b> {this.props.submission.marks}</h4>
                <h2><b>Result: </b>{this.props.submission.result}</h2>
            </div>
        )
    }
}

export default Report