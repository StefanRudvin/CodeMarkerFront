import React, { Component } from 'react';
import logo from './logo.svg';

// Bootstrap
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// Components
import Application from './Components/Application.js';
import Assignment  from './Components/Assignment.js';
import Login       from './Components/Login.js';
import NavBar      from './Components/Navigation/NavBar.js';

//  Views
import Course      from './Views/Course.js';

import './Css/App.css';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  { path: '/',
    exact: true,
    main: () => <h2>Home</h2>
  },
  { path: '/login',
    exact: true,
    main: () => <Login name="NameProp"/>
  },
  { path: '/user',
    main: () => <h2>User</h2>
  },
  { path: '/assignments',
    main: () => <h2>Assignments</h2>
  },
  { path: '/courses',
    main: () => <Course />
  }
]


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to CodeMarker</h1>
          </header>

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

          <p className="App-intro">
            Codemarker is an application used by the
          </p>
          <p className="App-intro">
            University of Aberdeen to assess student submissions for code assignments.
          </p>
        </div>
      </Router>
    );
  }
}

export default App;
