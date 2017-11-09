import { Button } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {}
    }
    this.props.history.listen((location, action) => {
      let id = location.pathname.slice(9);
      this.getCourse(id);
    });
  }

  getCourse(id){
    let url = 'http://127.0.0.1:8000/api/courses/' + id + '/?format=json';
    axios.get(url)
      .then( (response) => {
        return response.data})
      .then( (json) => {
        this.setState({course: json});
      });
  }

  componentDidMount() {
    this.getCourse(this.props.match.params.id);
  }
  render() {
    return (
      <div className="login">
        <h1>{this.state.course.name}</h1>
        <p>{this.state.course.description}</p>

        <Button active={false}>Helloo</Button>
        <Button active={true}>Helloo</Button>
        <Button bsStyle="warning">warning</Button>
        <Button bsStyle="default">Default</Button>
        <Button bsStyle="success">Success</Button>
      </div>
    );
  }
}

export default Course;