/*
Router switch for all views.

@TeamAlpha 2018
CodeMarker
*/

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import NewAssessmentsView from './../Views/NewAssessment.js'
import AssessmentView from './../Views/Assessment.js'
import SubmissionsView from './../Views/Submission.js'
import CourseView from './../Views/Course.js'
import NotFoundView from '../Views/NotFound'
import LoginView from './../Views/Login.js'
import AdminView from './../Views/Admin.js'
import HomeView from './../Views/Home.js'
import UserView from './../Views/User.js'
import React, { Component } from 'react'

class MyRouter extends Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route path='/admin' component={AdminView}/>
                    <Route path='/courses/:id' component={CourseView}/>
                    <Route path='/submissions' component={SubmissionsView}/>
                    <Route path='/users/:id' component={UserView}/>
                    <Route path='/assessments/:id' component={AssessmentView}/>
                    <Route path='/assessment/:id/new' component={NewAssessmentsView}/>
                    <Route path='/login' component={LoginView}/>
                    <Route exact path='/' component={HomeView}/>
                    <Route path='*' component={NotFoundView}/>
                </Switch>
            </Router>
        )
    }
}

export default MyRouter