import React from 'react';
import { Button } from 'react-bootstrap';

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: []
    }
  }

  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="login">
        <h1>I am course #{this.props.match.params.id}!</h1>

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