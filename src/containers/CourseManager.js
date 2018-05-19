import React from 'react';
import CourseList from "./CourseList";
import CourseService from "../services/CourseService";

export default class CourseManager
    extends React.Component {

    // constructor(props) {
    //     super(props)
    //     this.courseService = CourseService.instance();
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
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <CourseList/>
            </div>
        );
    }
}