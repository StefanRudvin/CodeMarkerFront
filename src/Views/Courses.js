import React from 'react';
import { Button } from 'react-bootstrap';

class Courses extends React.Component {
  render() {
    return (
      <div className="login">
        <Button active={false}>Helloo</Button>
        <Button active={true}>Helloo</Button>
        <Button bsStyle="warning">warning</Button>
        <Button bsStyle="default">Default</Button>
        <Button bsStyle="success">Success</Button>
      </div>
    );
  }
}

export default Courses;