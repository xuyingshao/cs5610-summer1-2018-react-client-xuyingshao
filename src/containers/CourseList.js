import React from 'react';
import CourseRow from '../components/CourseRow';
import CourseServiceClient from '../services/CourseServiceClient';

export default class CourseList
    extends React.Component {

    constructor() {
        super();
        this.courseService = CourseServiceClient.instance();

        this.state = {
            inputValue: '',
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

    // componentWillReceiveProps(newProps) {
    //
    // }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            })
    }

    titleChanged(event) {
        this.setState({inputValue: event.target.value});
        this.setState({course: {title: event.target.value}});
        // this.setState({course: {modified: event.target.time}});
    }

    createCourse() {
        this.setState({inputValue: ''});
        this.courseService.createCourse(this.state.course)
            .then(() => {
                this.findAllCourses();
            });
    }

    deleteCourse(courseId) {
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
        ;
        return courses;
    }

    render() {
        let course = {title: "hello", id: 123};
        return (
            <div>
                <div className="row container-fluid">
                    <div className="col-10">
                        <input id="couseTitle" className="form-control"
                               placeholder="Enter Course Title"
                               onChange={this.titleChanged} value={this.state.inputValue}/>
                    </div>
                    <button className="btn btn-secondary col-2" onClick={this.createCourse}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
                <br/>
                <div className="container-fluid">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Owned By</th>
                            <th>Last Modified</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderCourseRows()}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}