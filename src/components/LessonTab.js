import React from 'react';
import LessonServiceClient from "../services/LessonServiceClient";
import {Link} from "react-router-dom";

export default class LessonTab
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <li className="nav-item">
                <Link className="nav-link active"
                      to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}/edit`}>
                    {this.props.lessonTitle}
                </Link>
            </li>
        );
    }

    // onClick={this.props.onSelect}
}