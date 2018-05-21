import React from 'react';
import LessonServiceClient from "../services/LessonServiceClient";
import LessonTab from "../components/LessonTab";
import ModuleServiceClient from "../services/ModuleServiceClient";
import CourseServiceClient from "../services/CourseServiceClient";

export default class LessonTabs
    extends React.Component {
    constructor(props) {
        super(props);

        this.courseService = CourseServiceClient.instance();
        this.moduleService = ModuleServiceClient.instance();
        this.lessonService = LessonServiceClient.instance();

        this.state = {
            courseId: '',
            moduleId: '',
            lesson: {title: ''},
            lessons: [],
            inputValue: '',
            moduleTitle: '',
            course: {
                id: '',
                modified: ''
            }
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.createLesson = this.createLesson.bind(this);
        // this.findModuleName = this.findModuleName.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        // this.findAllLessonsForModule(this.props.courseId, this.props.moduleId);
        // this.findModuleName();
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId);
        // this.findModuleName();
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
        this.setState({
            course: {
                id: this.state.courseId,
                modified: new Date().toISOString()
            }
        });
    }

    createLesson() {
        this.courseService.updateCourse(this.state.course);
        this.setState({inputValue: ''});
        this.lessonService.createLesson(this.state.courseId, this.state.moduleId, this.state.lesson)
            .then(() => {
                this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
            });
    }

    // findModuleName() {
    //     if (this.state.moduleId === '') {
    //         return;
    //     }
    //     else {
    //         this.moduleService.findModuleById(this.state.moduleId)
    //             .then((module) => {
    //                 this.setState({moduleTitle: module.title});
    //                 // return (
    //                 //     <h3>&nbsp;&nbsp;&nbsp;{module.title}</h3>
    //                 // );
    //             })
    //     }
    // }

    render() {
        return (
            <div>
                <h3>&nbsp;&nbsp;&nbsp;Lesson List</h3>
                {/*<h3>&nbsp;&nbsp;&nbsp;{this.state.moduleTitle}</h3>*/}
                {/*/!*{this.findModuleName()}*!/*/}
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
            </div>
        );
    }
}