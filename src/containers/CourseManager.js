import React from 'react';
import CourseList from "./CourseList";
import CourseServiceClient from "../services/CourseServiceClient";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CourseEditor from './CourseEditor';

export default class CourseManager
    extends React.Component {

    // constructor(props) {
    //     super(props)
    //     this.courseService = CourseServiceClient.instance();
    //
    //     // this.titleChanged = this.titleChanged.bind(this);
    //     // this.createCourse = this.createCourse.bind(this);
    //
    // }

    // titleChanged(event) {
    //     console.log(event.target.value);
    //     this.setState({course: {title: event.target.value}});
    // }
    //
    // createCourse() {
    //     this.courseService.createCourse(this.state.course)
    //         .then(
    //             // () => {
    //             //     this.findAllCourses()
    //             // }
    //             function(response) {
    //                 return response.json();
    //             }
    //         );
    // }


    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <h1>Course Manager</h1>
                    <Route path="/courses" component={CourseList}></Route>
                    <Route path="/course/:courseId/edit" component={CourseEditor}></Route>
                </div>
            </Router>
        );
    }
}