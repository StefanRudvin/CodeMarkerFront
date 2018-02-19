import axios from 'axios'
import swal from 'sweetalert2'


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
                console.log("No credentials")
            }
        })
    },

    logout () {
        delete localStorage.token
    },

    loggedIn () {
        return !!localStorage.token
    },

    getToken (username, password, cb) {
        let url = 'http://127.0.0.1:8000/api/obtain-auth-token/'

        let formData = new FormData()

        formData.append('username', username)
        formData.append('password', password)

        axios.post(url, formData)
            .then((response) => {
                return response.data
            })
            .then((response) => {
                cb({
                    authenticated: true,
                    token: response.token
                })
            })
            .catch(error=> {
                console.log("error: ", error)
                swal({
                    type: 'error',
                    title: 'Wrong credentials',
                })
            })
    }
}