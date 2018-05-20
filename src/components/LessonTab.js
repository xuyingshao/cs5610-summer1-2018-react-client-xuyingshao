import React from 'react';
import LessonServiceClient from "../services/LessonServiceClient";

export default class LessonTab
    extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="nav-item active">
                <a className="nav-link" href="#">
                    {this.props.lessonTitle}
                    <span className="sr-only">(current)</span>
                </a>
            </li>
        );
    }
}