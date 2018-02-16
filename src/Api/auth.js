import axios from 'axios'
import Routes from './routes'

export default {
    /*

    This class acts as the authentication layer for the React frontend. It sends a login()
    request when the user logs in. If no token is present, it requests one from the
    backend with the given username and password, and saves it into local storage.

     */
    login: function(username, pass, loggedIn) {
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
            }
        })
    },

    token () {
        return localStorage.token
    },

    logout () {
        delete localStorage.token
    },

    loggedIn () {
        return !!localStorage.token
    },

    hasUserName () {
        return localStorage.username
    },

    getUserName() {
        if (localStorage.username) {
            //return localStorage.username
        }

        axios.get(Routes.auth.get_user)
            .then((response) => {
                localStorage.username = response.data
                return response.data
            })
            .catch((error) => {
                console.log(error)
            })
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
                this.getUser()
        })
    }
}