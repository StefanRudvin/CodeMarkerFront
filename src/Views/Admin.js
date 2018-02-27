import ConfigurableTable from './../Components/common/ConfigurableTable.js'
import ConfigurableForm from './../Components/common/ConfigurableForm.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import logo from './../Assets/CodeMarkerLogo.png'
import { Jumbotron } from 'react-bootstrap'
import Routes from './../Api/routes'
import Events from './../client.js'
import React from 'react'
import axios from 'axios'


class Admin extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            courses: [],
            name: '',
            description: '',
            id: '',
            updated_at: '',
            users: []
        }
    }

    getUsers () {
        axios.get(Routes.users_json)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({users: json})
            })
    }

    getCourses () {
        axios.get(Routes.courses_json)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({courses: json})
            })
    }

    componentDidMount () {
        this.getCourses()
        this.getUsers()
        Events.on('onCoursesChanged', () => {
            this.getCourses()
        });
        Events.on('onUsersChanged', () => {
            this.getUsers()
        });
    }

    render () {
        return (
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionName="SlideIn"
                className="admin"
            >
                <Jumbotron>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Admin Page</h1>
                    <br/>
                    <p className="App-intro">
                        Here you can administrate courses and assignments.
                    </p>
                </Jumbotron>

                <h3>Courses</h3>
                <ConfigurableTable
                    items={this.state.courses}
                    column1="Name"
                    column2="Description"
                    showDelete={true}
                    showEdit={true}
                    editRoute="/courses"
                    route="courses"
                    event="onCoursesChanged"
                />
                <ConfigurableForm
                    event="onCoursesChanged"
                    route="courses"
                    title="Create new Course"
                />

                <h3>Users</h3>

                <ConfigurableTable
                    items={this.state.users}
                    column1="UserName"
                    column2="Date joined"
                    column3="Email"
                    showDelete={true}
                    showEdit={true}
                    editRoute="/users"
                    route="users"
                    event="onUsersChanged"
                />
            </ReactCSSTransitionGroup>
        )
    }

}

export default Admin
