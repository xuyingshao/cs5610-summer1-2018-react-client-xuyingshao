import React from 'react';
import CourseList from "./CourseList";

export default class CourseManager
    extends React.Component {

    // FIXME, use <CourseList/>
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <CourseList/>
            </div>
        );
    }
}