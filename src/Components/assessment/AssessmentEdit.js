import {toast} from 'react-toastify'
import Events from './../../client.js'
import Routes from '../../Api/routes'
import Datetime from 'react-datetime'
import moment from 'moment'
import React from 'react'
import axios from 'axios'
import swal from 'sweetalert2'

class AssessmentEdit extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      additional_help: '',
      description: '',
      course: '',
      deadline: '',
      name: '',
      id: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
  }

  componentDidMount() {
    Events.on('onAssessmentRetrieved', (assessment) => {
      this.setState({additional_help: assessment.additional_help})
      this.setState({description: assessment.description})
      this.setState({deadline: assessment.deadline})
      this.setState({course: assessment.course})
      this.setState({name: assessment.name})
      this.setState({id: assessment.id})
      this.setState({max_time: assessment.max_time})
    })
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value})
  }

  handleAdditionalHelpChange(e) {
    this.setState({additional_help: e.target.value})
  }

  handleDeadlineChange(newDate) {
    this.setState({deadline: newDate})
  }

  handleMaxTimeChange(e) {
    this.setState({max_time: e.target.value})
  }

  handleDelete(e) {
    //deleting warning
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to undo this action.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonClass: 'confirm-class',
      cancelButtonClass: 'cancel-class',
      closeOnConfirm: false,
      closeOnCancel: false

    }).then((result) => {
      if (result.value) {
        axios.delete(Routes.base + 'assessments/' + this.state.id + '/')
          .then(() => {
            Events.emit(this.props.event)
            toast('Item deleted')
            window.location = '/'
          })
      }
    })
  }

  updateAssessment() {
    let formData = new FormData()

    let date = moment(this.state.deadline).format('YYYY-MM-DD HH:mm')
    formData.append('deadline', date)

    formData.append('name', this.state.name)
    formData.append('course', this.state.course)
    formData.append('description', this.state.description)
    formData.append('additional_help', this.state.additional_help)
    formData.append('max_time', this.state.max_time)

    axios.put(Routes.assessments + this.state.id + '/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        toast('Assessment updated')
        Events.emit('onCoursesChanged')
        Events.emit('onAssessmentEditComplete')
      }
      )
  }

  render() {
    return (
      <div>
        <div className="content">
          <h2>Update Assessment</h2>
          <label className="label">Name</label>
          <div className="control">
            <input
              ref="nameTextArea"
              className="input"
              onChange={this.handleNameChange}
              value={this.state.name}
              type="text"
              placeholder="Name" />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              value={this.state.description}
              placeholder="Assessment Description"
              onChange={this.handleDescriptionChange}
              type="text"
              ref="nameTextArea">
            </textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Additional Help</label>
          <div className="control">
            <textarea
              className="textarea"
              value={this.state.additional_help}
              placeholder="Assessment Description"
              onChange={this.handleAdditionalHelpChange.bind(this)}
              type="text"
              ref="nameTextArea">
            </textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Deadline</label>
          <div className="control">
            <Datetime onChange={this.handleDeadlineChange.bind(this)}
              value={this.state.deadline}
              dateFormat='YYYY-MM-DD'
              timeFormat='HH:mm' />
          </div>
        </div>

        <div className="field">
          <label className="label">Max Runtime (0 means unlimited)</label>
          <div className="control">
            <input onChange={this.handleMaxTimeChange.bind(this)}
              value={this.state.max_time}
              type="number"
              className="input">
            </input>
          </div>
        </div>

        <div className="button" onClick={this.updateAssessment.bind(this)}>
        Update Assessment
        </div>

        <div className="button" onClick={this.handleDelete.bind(this)}>
        Delete Assessment
        </div>
      </div>
    )
  }
}

export default AssessmentEdit
