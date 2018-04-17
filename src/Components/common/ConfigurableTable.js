/*
A configurable table to allow for DRY table creation.

@TeamAlpha 2018
CodeMarker
*/

import { Link } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import Routes from './../../Api/routes'
import Events from './../../client.js'
import { toast } from 'react-toastify'
import swal from 'sweetalert2'

class ConfigurableTable extends React.Component {

    deleteItem (item) {
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
                axios.delete(Routes.base + this.props.route + '/' + item.id + '/')
                    .then(() => {
                        Events.emit(this.props.event)
                        toast('Item deleted')
                    })
            }
        })
    }

    constructor (props) {
        super(props)
        this.state = {
            courses: []
        }
    }

    componentDidMount () {
        if (this.props.showTotalScore) {
            this.getAllCourses()
        }
    }

    getAllCourses () {
        axios.get(Routes.courses_json)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({courses: json})
            })
    }

    getUserTotalScore (userId) {
        let studentCourses = this.filterCourses(userId)

        let totalScore = 0

        let self = this

        studentCourses.forEach(function (course) {
            totalScore += self.getCourseTotalScore(course, userId)
        })
        return totalScore
    }

    getCourseTotalScore (course, userId) {
        let courseScore = 0

        course.assessments.forEach(function (assessment) {
            let bestSubmission = 0
            assessment.submissions.forEach(function (submission) {
                if (submission.marks >= bestSubmission && submission.user == userId) {
                    bestSubmission = submission.marks
                }
            })
            if (assessment.submissions.length > 0) {
                courseScore += bestSubmission
            }

        })
        return courseScore
    }

    filterCourses (userId) {
        let studentCourses = []

        this.state.courses.forEach(function (course) {
            if (course.students.includes(userId)) {
                studentCourses.push(course)
            }
        })

        return studentCourses
    }

    render () {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        {this.props.column1 ? (
                            <th>{this.props.column1}</th>
                        ) : null}
                        {this.props.column2 ? (
                            <th>{this.props.column2}</th>
                        ) : null}
                        {this.props.column3 ? (
                            <th>{this.props.column3}</th>
                        ) : null}
                        {this.props.showTotalScore ? (
                            <th>Total Score</th>
                        ) : null}
                        {this.props.showEdit ? (
                            <th>Edit</th>
                        ) : null}
                        {this.props.showDelete ? (
                            <th>Delete</th>
                        ) : null}
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.items.map(item => (
                        <tr>
                            <td>{Object.values(item)[0]}</td>
                            <td><Link to={this.props.route + '/' + item.id}>{Object.values(item)[1]}</Link></td>
                            {this.props.column2 ? (
                                <td>{Object.values(item)[2]}</td>
                            ) : null}
                            {this.props.column3 ? (
                                <td>{Object.values(item)[3]}</td>
                            ) : null}
                            {this.props.showTotalScore ? (
                                <td>{this.getUserTotalScore(Object.values(item)[0])}</td>
                            ) : null}
                            {this.props.showEdit ? (
                                <td><a href={this.props.editRoute + '/' + Object.values(item)[0]} className="button">Edit</a>
                                </td>
                            ) : null}
                            {this.props.showDelete ? (
                                <td><a className="button"
                                       onClick={() => this.deleteItem(item)}>{this.props.deleteName ? (this.props.deleteName) : 'Delete'}</a>
                                </td>
                            ) : null}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ConfigurableTable