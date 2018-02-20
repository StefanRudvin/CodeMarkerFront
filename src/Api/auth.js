import axios from 'axios'
import swal from 'sweetalert2'
import Routes from './routes'

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
                console.log("No credentials")
            }
        })
    },

    token() {
        return localStorage.token
    },

    logout() {
        delete localStorage.token
        delete localStorage.superuser
        delete localStorage.username
        delete localStorage.staff
        delete localStorage.user_id
    },

    getUserName() {
        return localStorage.username
    },

    loggedIn() {
        return !!localStorage.token
    },

    isAdmin() {
        return localStorage.superuser === "true";
    },

    isStaff() {
        return localStorage.staff === "true";
    },

    getToken(username, password, cb) {

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
                localStorage.username = response.username
                localStorage.superuser = response.superuser
                localStorage.staff = response.staff
                localStorage.user_id = response.user_id
            })
            .catch(error => {
                console.log("error: ", error)
                swal({
                    type: 'error',
                    title: 'Wrong credentials',
                })
            })
    }
}