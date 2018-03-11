export default {

    local: {
        assessments: 'http://localhost:3000/assessments/'
    },

    auth : {
        obtain_token : 'http://127.0.0.1:8000/api/obtain-auth-token/',
        get_user: 'http://127.0.0.1:8000/api/get-user/',
    },

    courses_json: 'http://127.0.0.1:8000/api/courses/?format=json',
    users_json: 'http://127.0.0.1:8000/api/users/?format=json',

    courses_users_delete: 'http://127.0.0.1:8000/api/courses/users/delete/',
    courses_users_add: 'http://127.0.0.1:8000/api/courses/users/add/',

    assessments: 'http://127.0.0.1:8000/api/assessments/',
    submissions: 'http://127.0.0.1:8000/api/submissions/',
    courses: 'http://127.0.0.1:8000/api/courses/',
    users: 'http://127.0.0.1:8000/api/users/',

    base: 'http://127.0.0.1:8000/api/',

}