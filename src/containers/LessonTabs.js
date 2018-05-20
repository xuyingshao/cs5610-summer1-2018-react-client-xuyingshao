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


    renderLessons() {
        let lessons = this.state.lessons.map(
            (lesson) => {
                return <LessonTab lessonTitle={lesson.title} key={lesson.id}/>
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
        console.log(this.state.courseId);
        console.log(this.state.moduleId);
        console.log(this.state.lesson);

        this.setState({inputValue: ''});
        this.lessonService.createLesson(this.state.courseId, this.state.moduleId, this.state.lesson)
            .then(() => {
                this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
            });
    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {this.renderLessons()}
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Add Lesson"
                               aria-label="Search" onChange={this.titleChanged} value={this.state.inputValue}/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.createLesson}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </form>
                </div>
            </nav>
        );
    }
}