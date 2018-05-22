import React from 'react';
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import Route from "react-router-dom/es/Route";
import LessonEditor from "./LessonEditor";


export default class ModuleEditor
    extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId: '',
            moduleId: '',
        };

        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
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

    render() {
        return (
            <div>
                <LessonTabs courseId={this.state.courseId} moduleId={this.state.moduleId}/>
                <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                       component={LessonEditor}></Route>
            </div>
        );
    }
}