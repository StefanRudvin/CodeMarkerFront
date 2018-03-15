import axios from 'axios'
import swal from 'sweetalert2'
import Routes from './routes'
import Events from './../client.js'

export default {
    /*

    This class acts as the authentication layer for the React frontend. It sends a login()
    request when the user logs in. If no token is present, it requests one from the
    backend with the given username and password, and saves it into local storage.

     */
    login: function (username, pass, loggedIn) {
        if (localStorage.token) {
            if (loggedIn) loggedIn(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (loggedIn) loggedIn(true)
            } else {
                if (loggedIn) loggedIn(false)
                console.log('No credentials')
            }
        })
    },

    token () {
        return localStorage.token
    },

    logout () {
        delete localStorage.token
    },

    getUser() {
        axios.post(Routes.auth.get_user)
            .then((response) => {
                return response.data
            })
            .then((response) => {

                let user = {
                    username: response.username,
                    superuser: response.superuser,
                    staff: response.staff,
                    user_id: response.user_id
                }

                Events.emit('onUserLogin', user)

            })
            .catch(error => {
                console.log('error: ', error)
            })
    },

    loggedIn () {
        return !!localStorage.token
    },

    getToken (username, password, cb) {

        let formData = new FormData()

        formData.append('username', username)
        formData.append('password', password)

        axios.post(Routes.auth.obtain_token, formData)
            .then((response) => {
                return response.data
            })
            .then((response) => {
                cb({
                    authenticated: true,
                    token: response.token
                })
            })
            .catch(error => {
                console.log('error: ', error)
                swal({
                    type: 'error',
                    title: 'Wrong credentials',
                })
            })
    }
}