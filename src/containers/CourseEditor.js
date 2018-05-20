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
            moduleId: ''
        };

        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.renderLessons = this.renderLessons.bind(this);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    selectModule(moduleId) {
        this.setState({moduleId: moduleId});
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        this.selectModule(this.props.match.params.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
        this.selectModule(newProps.match.params.moduleId);
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

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    Editing Course: {this.state.courseId}
                    <ModuleList courseId={this.state.courseId}/>
                </div>
                <div className="col-8">
                    {this.renderLessons()}
                </div>
            </div>
        );
    }
}