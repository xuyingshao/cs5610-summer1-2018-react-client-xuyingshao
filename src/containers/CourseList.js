import React from 'react';
import CourseRow from '../components/CourseRow';

export default class CourseList
    extends React.Component {

    constructor(props) {
        // props
        super(props);

        // state
        this.state = {
            courses: [
                {title: 'CS 1000', id: 1},
                {title: 'CS 2000', id: 2},
                {title: 'CS 3000', id: 3},
            ]
        };

        // event handlers
        this.titleChange = this.titleChange.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    titleChange(event) {
        console.log('change');
    }

    createCourse() {
        console.log('create');
    }

    deleteCourse() {
        console.log('delete');
    }

    renderListOfCourses() {
        let courses = this.state.courses.map(
            function(course) {
                return <CourseRow title={course.title} key={course.id}/>  // FIXME, dynamic course
            }
        );
        return courses;
    }

    render() {
        return (
            <div className="row">
                {/*<div className="col-2">Course Manager</div>*/}
                <input placeholder="title" className="form-control col-sm-8" onChange={this.titleChange}/>
                <button className="btn btn-primary col-sm-2" onClick={this.createCourse}>
                    <i className="fa fa-plus"></i>
                </button>
                <ul className="list-group">
                    {this.renderListOfCourses()}
                </ul>
            </div>
        );
    }
}