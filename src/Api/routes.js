export default {

    local: {
        assessments: 'http://localhost:3000/assessments/'
    },

    get : {
        courses: 'http://127.0.0.1:8000/api/courses/?format=json',
        course: 'http://127.0.0.1:8000/api/courses/',
        assessments: 'http://127.0.0.1:8000/api/assessments/',
    },

    delete: {
        courses: 'http://127.0.0.1:8000/api/courses/'
    },

    post: {
        courses: 'http://127.0.0.1:8000/api/courses/',
        submissions: 'http://127.0.0.1:8000/api/submissions/'
    }
}