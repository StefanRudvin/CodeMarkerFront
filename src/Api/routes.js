export default {

    local: {
        assessments: 'http://localhost:3000/assessments/'
    },

    auth: {
        obtain_token: 'http://codermarker.uoa.abdn.ac.uk:8000/api/obtain-auth-token/',
        get_user: 'http://codermarker.uoa.abdn.ac.uk:8000/api/get-user/',
    },

    courses_json: 'http://codermarker.uoa.abdn.ac.uk:8000/api/courses/?format=json',
    users_json: 'http://codermarker.uoa.abdn.ac.uk:8000/api/users/?format=json',

    courses_users_delete: 'http://codermarker.uoa.abdn.ac.uk:8000/api/courses/users/delete/',
    courses_users_add: 'http://codermarker.uoa.abdn.ac.uk:8000/api/courses/users/add/',

    assessments: 'http://codermarker.uoa.abdn.ac.uk:8000/api/assessments/',
    submissions: 'http://codermarker.uoa.abdn.ac.uk:8000/api/submissions/',
    courses: 'http://codermarker.uoa.abdn.ac.uk:8000/api/courses/',
    users: 'http://codermarker.uoa.abdn.ac.uk:8000/api/users/',

    base: 'http://codermarker.uoa.abdn.ac.uk:8000/api/',

}