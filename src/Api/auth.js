import axios from 'axios'
import Routes from './routes'

export default {
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