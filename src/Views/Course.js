import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import React from 'react';
import axios from 'axios';

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        'assessments' :[]
      }
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
        console.log(json);
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
        <p>Created at: {this.state.course.created_at}</p>
        <p>Updated at: {this.state.course.updated_at}</p>
        <p>{this.state.course.description}</p>

        <h2>Assessments</h2>
        {
          this.state.course.assessments.map(function(assessment) {
            return <li><Link to={'/assessments/' + assessment.id}>{assessment.name}</Link></li>
          })
        }
      </div>
    );
  }
}

export default Course;