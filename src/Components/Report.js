import React from 'react'
import swal from 'sweetalert2'

class Report extends React.Component {
    render() {
        return (
            <div className="content">
                {/* {swal({
                    title: 'Auto close alert!',
                    text: 'I will close in 5 seconds.',
                    timer: 5000,
                    onOpen: () => {
                        swal.showLoading()
                }})
                .then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === swal.DismissReason.timer
                    ) {
                        console.log('I was closed by the timer')
                    }
                })} */}

                <h3>Click on your submission to access more details</h3>
                <h4><b>Content Type:</b> {this.props.submission.content_type}</h4>
                <h4><b>Status: </b>{this.props.submission.status}</h4>
                <h4><b>File name: </b>{this.props.submission.filename}</h4>
                <h4><b>Time taken: </b>{this.props.submission.timeTaken}s</h4>
                <h4><b>Marks:</b> {this.props.submission.marks}</h4>
                <h2><b>Result: </b>{this.props.submission.result}</h2>

            </div>
        )
    }
}

export default Report