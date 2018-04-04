import { Bar } from 'react-chartjs-2'
import Dropdown from 'react-dropdown'
import Events from './../client.js'
import moment from 'moment'
import React from 'react'

class UserChart extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            selectedCourse: '',
            courseNames: [],
            id: '',
            show_late: true,
            user: [],
            username: '',
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
            data: {
                labels: [],
                datasets: [{
                    label: '',
                    data: []
                },
                ]
            }
        }
    }

    componentDidMount () {
        Events.on('onUserRetrieved', (user) => {
            this.setState({user: user})
            this.processData()
        })

        Events.on('onShowLateTrue', () => {
            this.setState({show_late: true}, () => {
                this.processData()
            })
        })

        Events.on('onShowLateFalse', () => {
            this.setState({show_late: false}, () => {
                this.processData()
            })
        })
    }

    processData () {
        let data = {}
        data.labels = []
        data.datasets = []

        let course = {}

        if (this.state.selectedCourse == '') {
            course = this.state.user.courses.filter(course => course.assessments.length > 0)[0]
            if (course == null) {
                this.setCourseNames()
                return
            }
        } else {
            course = this.state.user.courses.filter(course => course.name == this.state.selectedCourse)[0]
        }

        Events.emit('onCourseSelected', course)

        let dataset = []
        dataset.data = []
        dataset.label = this.state.selectedCourse

        dataset.borderColor = []
        dataset.borderColor.push('crimson')
        dataset.borderWidth = 1

        let self = this

        course.assessments.forEach(function (assessment) {
            let bestSubmission = null
            let bestMark = 0
            assessment.submissions.forEach(function (submission) {
                if (submission != null) {

                    if (self.state.show_late) {
                        if (submission.marks >= bestMark && submission.user == self.state.user.id) {
                            bestSubmission = submission
                            bestMark = submission.marks
                        }
                    } else {
                        if (submission.marks >= bestMark && submission.user == self.state.user.id && !submission.late) {
                            bestSubmission = submission
                            bestMark = submission.marks
                        }
                    }
                }
            })
            if (bestSubmission != null) {
                data.labels.push(assessment.name)
                dataset.data.push({x: assessment.name, y: bestSubmission.marks})
            } else {
                data.labels.push(assessment.name)
                dataset.data.push({x: assessment.name, y: 0})
            }
        })
        data.datasets.push(dataset)

        this.setState({data: data})

        this.setCourseNames()
    }

    setCourseNames () {
        let courses = this.state.user.courses
        courses = courses.filter(course => course.assessments.length > 0)
        this.setState({courseNames: courses.map(course => course.name)})
    }

    onCourseSelected (choice) {
        this.setState({selectedCourse: choice.value}, () => {
            this.processData()
        })
    }

    render () {
        return (
            <div>
                <Bar data={this.state.data} options={this.state.options} width={400} height={80}/>
                <br/>
                <Dropdown
                    className="dropDown"
                    options={this.state.courseNames}
                    onChange={this.onCourseSelected.bind(this)}
                    value={this.state.selectedCourse}
                    placeholder="Select Course to Display"/>
                <br/>
            </div>
        )
    }
}

export default UserChart