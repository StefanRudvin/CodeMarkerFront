import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import React from 'react';
import axios from 'axios';

class Assessments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assessment: {}
    }
    this.props.history.listen((location, action) => {
      let id = location.pathname.slice(9);
      this.getAssessment(id);
    });
  }

  getAssessment(id){
    let url = 'http://127.0.0.1:8000/api/assessments/' + id + '/?format=json';
    axios.get(url)
      .then( (response) => {
        return response.data})
      .then( (json) => {
        console.log(json);
        this.setState({assessment: json});
      });
  }

  componentDidMount() {
    this.getAssessment(this.props.match.params.id);
  }
  render() {
    return (
      <div className="login">
        <h1>{this.state.assessment.name}</h1>
        <p>Created at: {this.state.assessment.created_at}</p>
        <p>Updated at: {this.state.assessment.updated_at}</p>
        <p>{this.state.assessment.description}</p>
      </div>
    );
  }
}

export default Assessments;