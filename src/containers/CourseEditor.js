import React from 'react';
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import LessonTab from "../components/LessonTab";
import ModuleEditor from "./ModuleEditor";
import Route from "react-router-dom/es/Route";

export default class CourseEditor
    extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId: '',
        };

        this.selectCourse = this.selectCourse.bind(this);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
    }

    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <ModuleList courseId={this.state.courseId}/>
                </div>
                <div className="col-9">
                    <Route path="/course/:courseId/module/:moduleId" component={ModuleEditor}></Route>
                </div>
            </div>
        );
    }
}