import React from 'react';
import ModuleListItem from "../components/ModuleListItem";
import ModuleServiceClient from "../services/ModuleServiceClient";
import CourseServiceClient from "../services/CourseServiceClient";

export default class ModuleList
    extends React.Component {

    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance();
        this.moduleService = ModuleServiceClient.instance();

        this.state = {
            inputValue: '',
            courseId: '',
            course: {
                id: '',
                modified: ''
            },
            module: {title: ''},
            modules: [],
            currentCourse: ''
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.setCourse = this.setCourse.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
    }

    componentDidMount() {
        this.setCourse(this.props.courseId, this.props.course);
    }

    componentWillReceiveProps(newProps) {
        this.setCourse(newProps.courseId, newProps.course);
        this.findAllModulesForCourse(newProps.courseId);
    }

    setCourse(courseId, currentCourse) {
        this.setState({courseId: courseId});
        this.setState({currentCourse: currentCourse});
    }

    setModules(modules) {
        this.setState({modules: modules});
    }

    deleteModule(moduleId) {
        let course = {
            id: this.state.courseId,
            modified: new Date().toISOString()
        };
        this.courseService.updateCourse(course);
        this.moduleService.deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse(this.state.courseId)
            });
    }

    createModule() {
        this.setState({inputValue: ''});
        this.courseService.updateCourse(this.state.course);
        this.moduleService.createModule(this.state.courseId, this.state.module)
            .then(() => {
                this.findAllModulesForCourse(this.state.courseId);
            });
    }

    titleChanged(event) {
        this.setState({inputValue: event.target.value});
        this.setState({module: {title: event.target.value}});
        this.setState({
            course: {
                id: this.state.courseId,
                modified: new Date().toISOString()
            }
        });
    }

    findAllModulesForCourse(courseId) {
        this.moduleService.findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setModules(modules);
            });
    }

    renderListOfModules() {
        let modules = null;
        if (this.state.modules !== null) {
            modules = this.state.modules.map(
                (module) => {
                    return <ModuleListItem module={module}
                                           title={module.title}
                                           key={module.id}
                                           courseId={this.state.courseId}
                                           delete={this.deleteModule}
                                           onClick={this.props.onClick}/>
                }
            );
        }
        return modules;
    }

    render() {
        return (
            <div className="bg-light">
                <h3 className="text-center">{this.state.currentCourse.title}</h3>
                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
                <br/>
                <input placeholder="Add Module" className="form-control"
                       onChange={this.titleChanged} value={this.state.inputValue}/>
                <button className="btn btn-secondary btn-block" onClick={this.createModule}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>
        );
    }
}