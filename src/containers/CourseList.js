import React from 'react';
import CourseRow from '../components/CourseRow';
import CourseServiceClient from '../services/CourseServiceClient';

export default class CourseList
    extends React.Component {

    constructor() {
        super();
        this.courseService = CourseServiceClient.instance();

        this.state = {
            course: {title: '', modified: ''},
            courses: []
        };

        // event handlers
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    componentWillReceiveProps(newProps) {

    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            })
    }

    titleChanged(event) {
        this.setState({course: {title: event.target.value}});
        // this.setState({course: {modified: event.target.time}});
    }

    createCourse() {
        this.courseService.createCourse(this.state.course)
            .then(() => {
                this.findAllCourses();
            });
    }

    deleteCourse(courseId) {
        console.log('delete' + courseId);
        this.courseService.deleteCourse(courseId)
            .then(() => {
                this.findAllCourses();
            });
    }

    renderCourseRows() {
        let courses = this.state.courses.map(
            (course) => {
                return <CourseRow course={course} key={course.id}
                                  modified={course.modified} delete={this.deleteCourse}/>;
            }
        );
        return courses;
    }

    render() {
        let course = {title: "hello", id: 123};
        return (
            <div>
                <div className="row">
                    <input placeholder="title" className="form-control col-sm-8" onChange={this.titleChanged}/>
                    <button className="btn btn-primary col-sm-2 float-right" onClick={this.createCourse}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
                <br/>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Owned By</th>
                        <th>Last Modified</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>

        );
    }
}