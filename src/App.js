import React, { Component } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Components
import NavBar from './Components/Navigation/NavBar.js';

//  Views
import AssessmentsView from './Views/Assessments.js';
import SubmissionsView from './Views/Submission.js';
import CourseView      from './Views/Course.js';
import LoginView       from './Views/Login.js';
import AdminView       from './Views/Admin.js';
import HomeView        from './Views/Home.js';
import UserView        from './Views/User.js';

import './Css/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses : [],
    };
  }

  componentDidMount() {
    const url = 'http://127.0.0.1:8000/api/courses/?format=json';
    axios.get(url)
      .then( (response) => {
        return response.data})
      .then( (json) => {
        this.setState({courses: json});
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar courses={this.state.courses}/>
          <div className="container">
            <Switch>
              <Route exact path='/'          component={HomeView}/>
              <Route path='/admin'           component={AdminView}/>
              <Route path='/courses/:id'     component={CourseView}/>
              <Route path='/submissions'     component={SubmissionsView}/>
              <Route path='/login'           component={LoginView}/>
              <Route path='/user'            component={UserView}/>
              <Route path='/assessments/:id' component={AssessmentsView}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
