import React from 'react';
import LessonServiceClient from "../services/LessonServiceClient";
import LessonTab from "../components/LessonTab";

export default class LessonTabs
    extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId: '',
            moduleId: '',
            lesson: {title: ''},
            lessons: [],
            inputValue: ''
        };

        this.lessonService = LessonServiceClient.instance();
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.createLesson = this.createLesson.bind(this);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setLessons(lessons) {
        this.setState({lessons: lessons});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId);
    }

    // selectLesson() {
    //
    // }

    // onSelect={this.selectLesson}

    renderLessons() {
        let lessons = this.state.lessons.map(
            (lesson) => {
                return <LessonTab lessonTitle={lesson.title} key={lesson.id}
                courseId={this.state.courseId} moduleId={this.state.moduleId}
                lesson={lesson}/>
            }
        );
        return lessons;
    }

    findAllLessonsForModule(courseId, moduleId) {
        return this.lessonService.findAllLessonsForModule(courseId, moduleId)
            .then((lessons) => {
                this.setLessons(lessons);
            });
    }

    titleChanged(event) {
        this.setState({lesson: {title: event.target.value}});
        this.setState({inputValue: event.target.value});
    }

    createLesson() {
        this.setState({inputValue: ''});
        this.lessonService.createLesson(this.state.courseId, this.state.moduleId, this.state.lesson)
            .then(() => {
                this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
            });
    }

    render() {
        return (
            <div className="row container-fluid">
                <ul className="nav nav-tabs col-8 bg-light">
                    {this.renderLessons()}
                </ul>
                <form className="form-inline float-right">
                    <input className="form-control input-sm" placeholder="Add Lesson"
                           onChange={this.titleChanged} value={this.state.inputValue}/>
                    <button className="btn btn-outline-secondary" type="submit"
                            onClick={this.createLesson}>
                        <i className="fa fa-plus"></i>
                    </button>
                </form>
            </div>
        );
    }
}