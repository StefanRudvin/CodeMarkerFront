import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Auth from './../Api/auth.js'

import NewAssessmentsView from './../Views/NewAssessment.js'
import AssessmentsView from './../Views/Assessments.js'
import SubmissionsView from './../Views/Submission.js'
import CourseView from './../Views/Course.js'
import LoginView from './../Views/Login.js'
import AdminView from './../Views/Admin.js'
import HomeView from './../Views/Home.js'
import UserView from './../Views/User.js'

class MyRouter extends Component {
    constructor (props) {
        super(props)
        console.log('Router started...')
        this.state = {}
    }

    render () {
        return (
            <Router>
                <Switch>
                    <Route path='/admin' component={AdminView}/>
                    <Route path='/courses/:id' component={CourseView}/>
                    <Route path='/submissions' component={SubmissionsView}/>
                    <Route path='/user' component={UserView}/>
                    <Route path='/assessments/:id' component={AssessmentsView}/>
                    <Route path='/assessment/:id/new' component={NewAssessmentsView}/>
                    <Route path='/login' component={LoginView}/>
                    <Route path='/' component={HomeView}/>
                </Switch>
            </Router>
        )
    }
}

export default MyRouter