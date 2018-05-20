import React from 'react';
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import LessonTab from "../components/LessonTab";

export default class CourseEditor
    extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: ''
        };

        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.selectLesson = this.selectLesson.bind(this);
        this.renderLessons = this.renderLessons.bind(this);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    selectModule(moduleId) {
        this.setState({moduleId: moduleId});
    }

    selectLesson(lessonId) {
        this.setState({lessonId: lessonId});
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        this.selectModule(this.props.match.params.moduleId);
        this.selectLesson(this.props.match.params.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
        this.selectModule(newProps.match.params.moduleId);
        this.selectLesson(this.props.match.params.lessonId);
    }

    renderLessons() {
        if (this.state.moduleId === undefined) {
            return;
        }
        else {
            return (
                <LessonTabs courseId={this.state.courseId} moduleId={this.state.moduleId}/>
            );
        }
    }

    renderTopics() {
        if (this.state.lessonId === undefined) {
            return;
        }
        else {
            return (
                <div className="container">
                    <br/>
                    <ul className="nav nav-pills">
                        <li className="nav-item active">
                            <a className="nav-link active" href="#">Topic 1</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Topic 2</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Topic 3</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Topic 4</a>
                        </li>
                    </ul>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <ModuleList courseId={this.state.courseId}/>
                </div>
                <div className="col-9">
                    {this.renderLessons()}
                    {this.renderTopics()}
                </div>
            </div>
        );
    }
}