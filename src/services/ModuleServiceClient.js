let _singleton = Symbol();
const COURSE_API_URL = 'http://localhost:8080/api/course';
const MODULE_API_URL = 'http://localhost:8080/api/module';


export default class ModuleServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton!')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new ModuleServiceClient(_singleton);
        }
        return this[_singleton];
    }

    findAllModulesForCourse(courseId) {
        return fetch(COURSE_API_URL + '/' + courseId + '/module')
            .then(function(response) {
                return response.json();
            });
    }

    createModule(courseId, module) {
        return fetch(COURSE_API_URL + '/' + courseId + '/module', {
            method: 'post',
            body: JSON.stringify(module),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response) {
                return response.json();
            })
    }

    deleteModule(moduleId) {
        return fetch(MODULE_API_URL + '/' + moduleId, {
            method: 'delete'
        })
            .then(function(response) {
                return response;
            });
    }
}