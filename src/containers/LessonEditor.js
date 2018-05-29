import React from 'react';
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import TopicPills from "./TopicPills";
import WidgetApp from "./WidgetApp";
import {Provider} from "react-redux";
import {createStore} from "redux";
import WidgetReducer from "../reducers/WidgetReducer";
import ModuleEditor from "./ModuleEditor";
import {Route} from "react-router-dom";

export default class LessonEditor
    extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
        };

        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.selectLesson = this.selectLesson.bind(this);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    selectModule(moduleId, moduleTitle) {
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

    render() {
        let widgetStore = createStore(WidgetReducer);

        return (
            <Provider store={widgetStore}>
                <WidgetApp courseId={this.state.courseId}
                           moduleId={this.state.moduleId}
                           lessonId={this.state.lessonId}/>
            </Provider>
        );
    };
}




