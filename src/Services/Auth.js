import swal from 'sweetalert2'
import Routes from './Routes'
import axios from 'axios'
import UserActions from './User/UserActions'

export default {
    /*

    This class acts as the authentication layer for the React frontend. It sends a login()
    request when the user logs in. If no token is present, it requests one from the
    backend with the given username and password, and saves it into local storage.

     */
    login: function (username, pass, loggedIn) {

        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                if (loggedIn) loggedIn(true)
            } else {
                if (loggedIn) loggedIn(false)
                console.log('No credentials')
            }
        })
    },

    token () {
        return UserActions.getUser().token
    },

    logout (id) {
        UserActions.logout(id)
    },

    getUserName () {
        return UserActions.getUser().username
    },

    loggedIn () {
        console.log(UserActions.getUser())

        return UserActions.getUser() !== false;

    },

    isAdmin () {
        return UserActions.getUser().superuser
    },

    isStaff () {
        return UserActions.getUser().staff
    },

    getToken (username, password, callback) {

        let formData = new FormData()

        formData.append('username', username)
        formData.append('password', password)

        axios.post(Routes.auth.obtain_token, formData)
            .then((response) => {
                return response.data
            })
            .then((response) => {
                callback({
                    authenticated: true,
                    token: response.token
                })

                UserActions.login(
                    response.id,
                    response.token,
                    response.username,
                    response.superuser,
                    response.staff
                )

                console.log(UserActions.getUser())
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