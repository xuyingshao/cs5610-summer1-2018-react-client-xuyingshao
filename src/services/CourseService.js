let _singleton = Symbol();
const COURSE_API_URL = 'http://localhost:8080/api/course';

export default class CourseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }
    }

    static instance() {
        if(!this[_singleton]) {
            this[_singleton] = new CourseService(_singleton);
        }
        return this[_singleton];
    }

    findAllCourses() {
        return fetch(COURSE_API_URL)
            .then(function(response) {
                return response.json();
            });
    }

    createCourse(course) {
        return fetch(COURSE_API_URL, {
            method: 'post',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response) {
                return response.json();
            });
    }

    deleteCourse(courseId) {
        return fetch(COURSE_API_URL + '/' + courseId, {
            method: 'delete'
        })
            .then(function(response) {
                return response;
            });
    }

    findCourseById(courseId) {
        return fetch(COURSE_API_URL + '/' + courseId)
            .then(function(response) {
                return response.json();
            })
    }

    updateCourse(course) {
        return fetch(COURSE_API_URL, {
            method: 'put',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response) {
                return response.json();
            });
    }
}