import React from 'react';
import logo from './../logo.svg';

class User extends React.Component {
  render() {
    return (
      <div className="home">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">User Profile</h1>
        </header>
      </div>
    );
  }
}


export default User;