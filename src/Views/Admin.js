import ConfigurableTable from './../Components/common/ConfigurableTable.js'
import ConfigurableForm from './../Components/common/ConfigurableForm.js'
import UserForm from './../Components/UserForm.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import logo from './../Assets/CodeMarkerLogo.png'
import { Jumbotron, Button } from 'react-bootstrap'
import Routes from './../Api/routes'
import Events from './../client.js'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Dropzone from 'react-dropzone'
import swal from 'sweetalert2'
import Auth from '../Api/auth'

class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            name: '',
            description: '',
            id: '',
            updated_at: '',
            users: [],
            user: {
                is_superuser: false,
                is_staff: false
            },
            backupUploaded: false,
            backup: {},
            csvUploaded: false,
            csv: {}
        }
    }

    getUsers() {
        axios.get(Routes.users_json)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({ users: json })
            })
    }

    getCourses() {
        axios.get(Routes.courses_json)
            .then((response) => {
                return response.data
            })
            .then((json) => {
                this.setState({ courses: json })
            })
    }

    getUser() {
        axios.post(Routes.auth.get_user)
            .then((response) => {
                return response.data
            })
            .then((response) => {
                this.setState({ user: response })
                Events.emit('onUserRetrieved')
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }

    componentDidMount() {
        this.getUser()
        Events.on('onUserRetrieved', () => {
            this.getCourses()
            this.getUsers()
        })
        Events.on('onCoursesChanged', () => {
            this.getCourses()
        })
        Events.on('onUsersChanged', () => {
            this.getUsers()
        })
    }

    createBackup() {
        axios.post(Routes.create_backup, { responseType: 'application/zip' })
            .then((response) => {
                toast("Backup has been created in backups/ folder!")
            })
            .catch(error => {
                console.log('error: ', error)
            })
    }

    uploadBackup(files) {
        let formData = new FormData()
        formData.append('backup', files[0])

        axios.post(Routes.restore_backup, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                Auth.logout()
                window.location = '/login'
            })
            .catch(() => {
                console.error("error uploading backup")
            })
    }

    onBackupDrop(files) {
        this.setState({ backup: files[0] })
        this.setState({ backupUploaded: true })

        swal({
            title: 'Are you sure?',
            text: 'All current data will be replaced by a provided backup. Upon completion you will be logged out and redirected to home',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonClass: 'confirm-class',
            cancelButtonClass: 'cancel-class'
        })
            .then((willDelete) => {
                if (willDelete.value) {
                    this.uploadBackup(files);

                } else {
                    swal("Operation cancelled!");
                }
            });
    }

    uploadCsv(files) {
        let formData = new FormData()
        formData.append('csv', files[0])

        axios.post(Routes.import_users, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                window.location.reload()
            })
            .catch(() => {
                console.error("error uploading backup")
            })
    }

    onCsvDrop(files) {
        this.setState({ csv: files[0] })
        this.setState({ csvUploaded: true })

        swal({
            title: 'Are you sure? All duplicated users will be deleted!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, import them!',
            confirmButtonClass: 'confirm-class',
            cancelButtonClass: 'cancel-class'
        })
            .then((willDelete) => {
                if (willDelete.value) {
                    this.uploadCsv(files);

                } else {
                    swal("Operation cancelled!");
                }
            });
    }

    render() {
        const dropzoneStyle = {
            border: "3px dashed black",
            width: "20%",
            padding: "20px",
            margin: "25px auto"
        }
        return (
            <div>
                {
                    this.state.user.is_staff || this.state.user.is_superuser ? <ReactCSSTransitionGroup
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
                            <br />
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

                        <UserForm route="users" event="onUsersChanged">

                        </UserForm>

                        <br />
                        <hr />
                        <h3> <b>Import multiple users from CSV</b> </h3>
                        <h4> Important! Each file HAS to be of following format:</h4>
                        <span>FirstName,LastNameUsername,Email,Password,Course1 Course2 Course3...</span>
                        <Dropzone style={dropzoneStyle} onDrop={this.onCsvDrop.bind(this)} >
                            {this.state.csvUploaded ? (
                                <h2>{this.state.csv.name}</h2>
                            ) : <h2>Click here to select your CSV file</h2>}
                        </Dropzone>
                        <hr />
                        <h3> <b>Create Backup</b> </h3>
                        <br />
                        <Button
                            onClick={() => this.createBackup()}>
                            Click here to generate
                        </Button>
                        <hr />
                        <h3> <b>Restore Backup</b> </h3>
                        <Dropzone style={dropzoneStyle} onDrop={this.onBackupDrop.bind(this)} >
                            {this.state.backupUploaded ? (
                                <h2>{this.state.backup.name}</h2>
                            ) : <h2>Click here to select your backup file</h2>}
                        </Dropzone>



                    </ReactCSSTransitionGroup> : <div><h1>You are not allowed to view this page</h1></div>
                }
            </div>
        )
    }

}

export default Admin
