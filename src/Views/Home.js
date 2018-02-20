import ConfigurableTable from './../Components/common/ConfigurableTable.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import logo from './../Assets/CodeMarkerLogo.png';
import { Jumbotron } from 'react-bootstrap'
import Routes from './../Api/routes'
import React from 'react';
import axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        axios.get(Routes.courses_json)
            .then( (response) => {
                return response.data})
            .then( (json) => {
                this.setState({courses: json});
            })
            .catch(error =>  {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            })
    }
    render() {
    return (
        <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={300}
        transitionName="SlideIn"
        className="home">
            <Jumbotron>
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to CodeMarker</h1>
                <br/>
                <p className="App-intro">
                    Codemarker is an application used by the
                </p>
                <p className="App-intro">
                    University of Aberdeen to assess student submissions for code assignments.
                </p>
            </Jumbotron>

            <ConfigurableTable
                items={this.state.courses}
                column1="Name"
                column2="Description"
                route="courses"
            />

        </ReactCSSTransitionGroup>
    );
    }
}


export default Home;