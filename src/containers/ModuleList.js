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
            modules: []
        }

        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModules(modules) {
        this.setState({modules: modules});
    }

    deleteModule(moduleId) {
        this.setState({
            course: {
                id: this.state.courseId,
                modified: new Date().toISOString()
            }
        });
        this.courseService.updateCourse(this.state.course);
        this.moduleService.deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse(this.props.courseId)
            });
    }

    createModule() {
        this.setState({inputValue: ''});
        this.courseService.updateCourse(this.state.course);
        this.moduleService.createModule(this.props.courseId, this.state.module)
            .then(() => {
                this.findAllModulesForCourse(this.props.courseId);
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
        let modules = this.state.modules.map(
            (module) => {
                return <ModuleListItem module={module} title={module.title} key={module.id}
                                       courseId={this.state.courseId} delete={this.deleteModule}
                                       onClick={this.props.onClick}/>
            }
        );
        return modules;
    }

    render() {
        return (
            <div className="bg-light">
                <h3 className="text-center">Module List</h3>
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