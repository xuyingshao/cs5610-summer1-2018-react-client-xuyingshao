import React from 'react';
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import Route from "react-router-dom/es/Route";
import LessonEditor from "./LessonEditor";
import ModuleServiceClient from "../services/ModuleServiceClient";


export default class ModuleEditor
    extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId: this.props.match.params.courseId,
            moduleId: this.props.match.params.moduleId,
            currentModule: ''
        };

        this.moduleService = ModuleServiceClient.instance();

        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.findModuleById = this.findModuleById.bind(this);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    selectModule(moduleId) {
        this.setState({moduleId: moduleId});
    }

    componentDidMount() {
        // this.selectCourse(this.props.match.params.courseId);
        // this.selectModule(this.props.match.params.moduleId);
        this.findModuleById(this.props.match.params.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
        this.selectModule(newProps.match.params.moduleId);
        this.findModuleById(newProps.match.params.moduleId);
    }

    findModuleById(moduleId) {
        this.moduleService.findModuleById(moduleId)
            .then((module) => {
                this.setState({currentModule: module});
            })
    }

    render() {
        // console.log(this.state);
        return (
            <div>
                <LessonTabs courseId={this.state.courseId}
                            moduleId={this.state.moduleId}
                            module={this.state.currentModule}/>
                <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                       component={LessonEditor}></Route>
            </div>
        );
    }
}