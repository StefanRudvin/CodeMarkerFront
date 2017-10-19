import React, { Component } from 'react';
import logo from './logo.svg';

// Bootstrap
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

// Components
import Application from './Components/Application.js';
import Assignment  from './Components/Assignment.js';
import Login       from './Components/Login.js';
import NavBar      from './Components/Navigation/NavBar.js';

import './Css/App.css';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to CodeMarker</h1>
        </header>
        <p className="App-intro">
          Codemarker is an application used by the University of Aberdeen to assess student submissions for code assignments.
        </p>
        <Welcome name="Stefan"/>
        <Application/>
        <Assignment/>
        <Login name="NameProp"/>

      </div>
    );
  }
}

export default App;
