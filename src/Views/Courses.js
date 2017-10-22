import React from 'react';
import { Navbar, Button, FormControl, FormGroup } from 'react-bootstrap';

class Login extends React.Component {
  render() {
    return (
      <div className="login" style={loginStyle}>
        {this.props.name}

        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="">UserName</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>
              {' '}
            </Navbar.Form>
          </Navbar.Collapse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="">Password</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>
              {' '}
              <Button type="submit">Submit</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>

        <Button active={false}>Helloo</Button>
        <Button active={true}>Helloo</Button>
        <Button bsStyle="warning">warning</Button>
        <Button bsStyle="default">Default</Button>
        <Button bsStyle="success">Success</Button>
      </div>
    );
  }
}

const loginStyle = {

};

export default Login;