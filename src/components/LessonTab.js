import React from 'react';
import LessonServiceClient from "../services/LessonServiceClient";
import {Link} from "react-router-dom";

export default class LessonTab
    extends React.Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = () => {
        if (window.confirm("Do you want to delete the lesson?")) {
            this.props.delete(this.props.lesson.id);
        }
    }

    render() {
        return (
            <li className="nav-item">
                <Link className="nav-link"
                      to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
                    {this.props.lessonTitle}
                    <i className="fa fa-times" onClick={this.onDelete}></i>
                </Link>
            </li>
        );
    }
}