import React from 'react';
import ConfigurableTable from './../Components/common/ConfigurableTable.js';
import logo from './../Assets/CodemarkerLogo.png';

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          name: "Algorithmic Problem Solving",
          code: "CS3026",
          description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        },
        {
          id: 2,
          name: "Algorithmic Problem Solving",
          code: "CS3026",
          description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        },
        {
          id: 3,
          name: "Rave at Woodstock '69",
          code: "CSLove",
          description: "Roses are red, violets are blue, puppies are cute and so are you <33."
        },
        {
          id: 4,
          name: "Algorithmic Problem Solving",
          code: "CS3026",
          description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        },
        {
          id: 5,
          name: "Algorithmic Problem Solving",
          code: "CS3026",
          description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        },
        {
          id: 6,
          name: "Algorithmic Problem Solving",
          code: "CS3026",
          description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
        },
      ],
      name: '',
      code: '',
      description: '',
      id: '',
      updated_at: ''
    };
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="admin">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to CodeMarker</h1>
        </header>

        <h3>Courses</h3>
        <ConfigurableTable items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Name"
            onChange={this.handleNameChange}
            value={this.state.name}
          />
          <input
            placeholder="Course Code"
            onChange={this.handleCodeChange}
            value={this.state.code}
          />
          <input
            placeholder="Description"
            onChange={this.handleDescriptionChange}
            value={this.state.description}
          />
          <h4>Submit</h4>
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    );
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleCodeChange(e) {
    this.setState({ code: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.name.length) {
      return;
    }
    const newItem = {
      name: this.state.name,
      code: this.state.code,
      description: this.state.description,
      id: this.state.items.length + 1,
      updated_at: Date.now()
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      description: '',
      updated_at: '',
      name: '',
      code: '',
      id: '',
    }));
  }

}

export default Admin;
