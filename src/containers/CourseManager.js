import React from 'react';
import CourseList from "./CourseList";
import CourseServiceClient from "../services/CourseServiceClient";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CourseEditor from './CourseEditor';
import LessonTabs from './LessonTabs';
import CourseCard from '../components/CourseCard';
import ModuleList from './ModuleList';
import ModuleEditor from './ModuleEditor';

export default class CourseManager
    extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            courseTitle: ''
        };

        this.courseService = CourseServiceClient.instance();
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            });
    }

    renderAllCourses() {
        let courses = this.state.courses.map(
            (course) => {
                return <CourseCard key={course.id} title={course.title}/>;
            }
        );
        return courses;
    }

    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <Route path="/courses" component={CourseList}></Route>
                    <Route path="/course/:courseId" component={CourseEditor}></Route>
                </div>
            </Router>
        );
    }
}