import React from 'react';
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import TopicPills from "./TopicPills";
import WidgetListContainer from "./WidgetListContainer";
import {Provider} from "react-redux";
import {createStore} from "redux";
import WidgetReducer from "../reducers/WidgetReducer";
import ModuleEditor from "./ModuleEditor";
import {Route} from "react-router-dom";
import LessonServiceClient from "../services/LessonServiceClient";


let widgetStore = createStore(WidgetReducer);

export default class LessonEditor
    extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId: this.props.match.params.courseId,
            moduleId: this.props.match.params.moduleId,
            lessonId: this.props.match.params.lessonId,
            currentLesson: ''
        };

        this.lessonService = LessonServiceClient.instance();

        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.selectLesson = this.selectLesson.bind(this);
        this.findLessonById = this.findLessonById.bind(this);
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
        // this.selectCourse(this.props.match.params.courseId);
        // this.selectModule(this.props.match.params.moduleId);
        // this.selectLesson(this.props.match.params.lessonId);
        this.findLessonById(this.props.match.params.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
        this.selectModule(newProps.match.params.moduleId);
        this.selectLesson(newProps.match.params.lessonId);
        this.findLessonById(newProps.match.params.lessonId);
    }

    findLessonById(lessonId) {
        this.lessonService.findLessonById(lessonId)
            .then((lesson) => {
                this.setState({currentLesson: lesson});
            })
    }

    render() {
        // console.log('in lesson editor');
        // console.log(this.state.lessonId);

        return (
            <Provider store={widgetStore}>
                <WidgetListContainer courseId={this.state.courseId}
                                     moduleId={this.state.moduleId}
                                     lessonId={this.state.lessonId}
                                     lesson={this.state.currentLesson}/>
            </Provider>
        );
    };
}




