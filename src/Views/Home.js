import ConfigurableTable from './../Components/common/ConfigurableTable.js';
import logo from './../Assets/CodeMarkerLogo.png';
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
        <div className="home">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to CodeMarker</h1>
            </header>
            <br/>
            <p className="App-intro">
                Codemarker is an application used by the
            </p>
            <p className="App-intro">
                University of Aberdeen to assess student submissions for code assignments.
            </p>

            <ConfigurableTable items={this.state.courses} link="courses" tableHeader="Course Name" tableDescription="Course Description"/>
        </div>
    );
    }
}


export default Home;