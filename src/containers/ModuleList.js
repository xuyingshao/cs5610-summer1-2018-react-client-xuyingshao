import React from 'react';
import ModuleListItem from "../components/ModuleListItem";
import ModuleService from "../services/ModuleService";

export default class ModuleList
    extends React.Component {

    constructor(props) {
        super(props);
        this.moduleService = ModuleService.instance();

        this.state = {
            courseId: '',
            module: {title: ''},
            modules: []
        }

        this.createModule = this.createModule.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
    }

    deleteModule(moduleId) {
        this.moduleService.deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse(this.props.courseId)
            });
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModules(modules) {
        this.setState({modules: modules});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
    }

    createModule() {
        this.moduleService.createModule(this.props.courseId, this.state.module)
            .then(() => {
                this.findAllModulesForCourse(this.props.courseId);
            });
    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
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
                delete={this.deleteModule}/>
            }
        );
        return modules;
    }

    render() {
        return (
            <div>
                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
                <input placeholder="title" className="form-control" onChange={this.titleChanged}/>
                <button className="btn btn-primary" onClick={this.createModule}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>
        );
    }
}