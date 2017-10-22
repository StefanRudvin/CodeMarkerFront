import React from 'react';
import logo from './../logo.svg';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to CodeMarker</h1>
        </header>

        <p className="App-intro">
          Codemarker is an application used by the
        </p>
        <p className="App-intro">
          University of Aberdeen to assess student submissions for code assignments.
        </p>
      </div>
    );
  }
}


export default Home;