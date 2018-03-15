import config from './../env'
export default {

    local: {
        assessments: 'http://localhost:3000/assessments/'
    },

    auth : {
        obtain_token : config.API_URL + 'obtain-auth-token/',
        get_user: config.API_URL + 'get-user/',
    },

    courses_json: config.API_URL + 'courses/?format=json',
    users_json: config.API_URL + 'users/?format=json',

    courses_users_delete: config.API_URL + 'courses/users/delete/',
    courses_users_add: config.API_URL + 'courses/users/add/',

    assessments: config.API_URL + 'assessments/',
    submissions: config.API_URL + 'submissions/',
    courses: config.API_URL + 'courses/',
    users: config.API_URL + 'users/',

    base: config.API_URL
}