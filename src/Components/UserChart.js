import { Jumbotron, Col } from 'react-bootstrap'
import CourseItem from '../Components/common/CourseItem'
import { Link } from 'react-router-dom'
import Dropdown from 'react-dropdown'
import { toast } from 'react-toastify'
import Routes from './../Api/routes'
import Events from './../client.js'
import moment from 'moment'
import React from 'react'
import axios from 'axios'
import {Line} from 'react-chartjs-2';

class UserChart extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            id: '',
            user: [],
            username: '',
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
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

    componentDidMount() {
        Events.on('onUserRetrieved', (user) => {
            this.processData(user)
        })
    }

    processData(user) {

        let data = {}
        data.labels = []
        data.datasets = []

        let smallestDate = null
        let largestDate = null

        user.courses.forEach(function (course) {
            let dataset = []
            dataset.data = []
            dataset.label = course.name

            course.assessments.forEach(function (assessment) {
                let bestSubmission = null
                let bestMark = 0
                assessment.submissions.forEach(function (submission) {
                    if (submission != null) {
                        if (submission.marks > bestMark){

                            bestSubmission = submission
                            bestMark = submission.marks
                        }
                    }
                })
                if (bestSubmission != null) {
                    console.log(bestSubmission)
                    let date = moment(bestSubmission.updated_at)

                    data.labels.push(date.format("DD/MM"))
                    dataset.data.push({x: date, y: bestSubmission.marks})
                }
            })
            data.datasets.push(dataset)
        })

        this.setState({data: data})

        console.log(data)

    }

    render () {
        return (
            <div>
                <Line data={this.state.data} options={this.state.options} width={400} height={80}/>
            </div>
        )
    }
}

export default UserChart