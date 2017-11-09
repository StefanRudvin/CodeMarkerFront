import ConfigurableTable from './../Components/common/ConfigurableTable.js';
import logo from './../Assets/CodeMarkerLogo.png';
import React from 'react';
import axios from 'axios';

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      name        : '',
      code        : '',
      description : '',
      id          : '',
      updated_at  : ''
    };

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleNameChange        = this.handleNameChange.bind(this);
    this.handleCodeChange        = this.handleCodeChange.bind(this);
    this.handleSubmit            = this.handleSubmit.bind(this);
    this.nameWarning        = '';
    this.descriptionWarning = '';
    this.codeWarning        = '';
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
      <div className="admin">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to CodeMarker</h1>
        </header>

        <h3>Courses</h3>
        <ConfigurableTable items={this.state.courses} link="courses"/>
        <form onSubmit={this.handleSubmit}>
          <p>{this.nameWarning}</p>
          <input
            placeholder="Name"
            onChange={this.handleNameChange}
            value={this.state.name}
          />
          <p>{this.codeWarning}</p>
          <input
            placeholder="Course Code"
            onChange={this.handleCodeChange}
            value={this.state.code}
          />
          <p>{this.descriptionWarning}</p>
          <input
            placeholder="Description"
            onChange={this.handleDescriptionChange}
            value={this.state.description}
          />
          <h4>Submit</h4>
          <button>
            Add #{this.state.courses.length + 1}
          </button>
        </form>
      </div>
    );
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
    this.nameWarning = '';
  }

  handleCodeChange(e) {
    this.setState({ code: e.target.value });
    this.codeWarning = '';
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
    this.descriptionWarning = '';
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Handle submit!');
    if (!this.state.name.length) {
      console.log('name warning');
      this.nameWarning = 'You must specify the course name';
      return;
    }
    if (!this.state.code.length) {
      console.log('code warning');
      this.codeWarning = 'You must specify the course code';
      return;
    }
    if (!this.state.description.length) {
      this.descriptionWarning = 'You must specify the course description';
      return;
    }
    const newCourse = {
      name        : this.state.name,
      code        : this.state.code,
      description : this.state.description,
      id          : this.state.courses.length + 1,
      updated_at  : Date.now()
    };
    this.setState((prevState) => ({
      courses     : prevState.courses.concat(newCourse),
      description : '',
      updated_at  : '',
      name        : '',
      code        : '',
      id          : '',
    }));
  }
}

export default Admin;
