import React from 'react';
import LessonServiceClient from "../services/LessonServiceClient";
import {Link} from "react-router-dom";

export default class LessonTab
    extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="nav-item">
                <Link className="nav-link"
                      to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}/edit`}>
                    {this.props.lessonTitle}
                </Link>
                {/*<button>*/}
                    {/*<i className="fa fa-times"></i>*/}
                {/*</button>*/}
            </li>
        );
    }

    // onClick={this.props.onSelect}
    // {`nav-link ${this.props.active}`}
}