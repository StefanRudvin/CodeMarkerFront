import React, { Component } from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom'

import CoursesJSON from './Api/Courses.json'

// Components
import NavBar from './Components/Navigation/NavBar.js';

//  Views
import AssessmentsView from './Views/Assessments.js';
import CoursesView     from './Views/Courses.js';
import LoginView       from './Views/Login.js';
import HomeView        from './Views/Home.js';
import UserView        from './Views/User.js';

import './Css/App.css';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  { path: '/',
    exact: true,
    main: () => <HomeView />
  },
  { path: '/login',
    exact: true,
    main: () => <LoginView />
  },
  { path: '/user',
    main: () => <UserView />
  },
  { path: '/courses/assessments',
    main: () => <AssessmentsView />
  },
  { path: '/courses',
    main: () => <CoursesView />
  }
]

class App extends Component {
  componentDidMount() {
    console.log('Main component loaded')
  }
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar courses={Courses}/>
          <div class="container">
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>

        </div>
      </Router>
    );
  }
}

const Courses = [
  {
    'id' : 1,
    'name' : "CS3028 Algorithms"
  },
  {
    'id' : 2,
    'name' : "CS3029 Operating Systems"
  },
  {
    'id' : 3,
    'name' : "CS3010 Computer Architecture"
  },
  {
    'id' : 4,
    'name' : "CS3031 Software Engineering"
  },
  {
    'id' : 5,
    'name' : "CS2048 Web application development"
  },
]

export default App;
