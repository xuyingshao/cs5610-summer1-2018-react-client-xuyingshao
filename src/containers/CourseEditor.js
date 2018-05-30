import React from 'react';
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import LessonTab from "../components/LessonTab";
import ModuleEditor from "./ModuleEditor";
import Route from "react-router-dom/es/Route";
import CourseServiceClient from "../services/CourseServiceClient";
import Link from "react-router-dom/es/Link";

export default class CourseEditor
    extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId: this.props.match.params.courseId,
            course: '',
            inputValue: '',
            newCourse: ''
        };

        this.courseService = CourseServiceClient.instance();

        this.selectCourse = this.selectCourse.bind(this);
        this.findCourseById = this.findCourseById.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.changeCourseTitle = this.changeCourseTitle.bind(this);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        // this.selectCourse(this.props.match.params.courseId);
        this.findCourseById(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
        this.findCourseById(newProps.match.params.courseId);
    }

    findCourseById(courseId) {
        this.courseService.findCourseById(courseId)
            .then((course) => {
                this.setState({course: course});
            })
    }

    titleChanged(event) {
        this.setState({inputValue: event.target.value});

        this.setState({
            newCourse: Object.assign(
                {},
                this.state.course,
                {
                    title: event.target.value,
                    modified: new Date().toISOString()
                })
        });

        console.log(this.state.newCourse);
    }

    changeCourseTitle() {
        this.setState({inputValue: ''});
        this.courseService.updateCourse(this.state.newCourse)
            .then(() => {
                this.findCourseById(this.state.courseId);
            });
    }

    render() {
        // console.log(this.state);
        return (
            <div>
                <div>
                    <div className="smallHeader container-fluid row">
                        <Link to="/courses">
                            <i className="fa fa-arrow-left float-left col-1"></i>
                        </Link>
                        <h2 className="col-4">Course Editor</h2>
                        <input className="form-control col-6"
                               type="text"
                               onChange={this.titleChanged}
                               placeholder="Change Course Title"
                               value={this.state.inputValue}/>
                        <i className="fa fa-pencil col-1"
                           onClick={this.changeCourseTitle}></i>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <ModuleList courseId={this.state.courseId}
                                    course={this.state.course}/>
                    </div>
                    <div className="col-9">
                        <Route path="/course/:courseId/module/:moduleId"
                               component={ModuleEditor}></Route>
                    </div>
                </div>
            </div>
        );
    }
}