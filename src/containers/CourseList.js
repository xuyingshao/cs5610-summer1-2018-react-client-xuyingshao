import React from 'react';
import CourseRow from '../components/CourseRow';
import CourseService from '../services/CourseService';

export default class CourseList
    extends React.Component {

    constructor() {
        super();
        this.courseService = CourseService.instance();

        this.state = {
            course: {title: ''},
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
                console.log(courses);
                this.setState({courses: courses});
            })
    }

    titleChanged(event) {
        this.setState({course: {title: event.target.value}});
    }

    createCourse() {
        this.courseService.createCourse(this.state.course)
            .then(() => {
                this.findAllCourses()
            });
    }

    // deleteCourse = (id) => {
    //     console.log('delete' + id);
    // }

    deleteCourse(courseId) {
        console.log('delete' + courseId);
    }

    renderCourseRows() {
        let courses = this.state.courses.map(
            function (course) {
                return <CourseRow course={course} key={course.id}/>;
            }
        );
        return courses;

        // deleteCourse={this.deleteCourse}

        // let courses = null;
        //
        // if (this.state) {
        //     courses = this.state.courses.map(
        //         function (course) {
        //             return <CourseRow title={course.title} key={course.id}/>
        //         }
        //     );
        // }
        // return courses;
    }

    render() {
        return (
            <div>
                {/*<div className="col-2">Course Manager</div>*/}
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