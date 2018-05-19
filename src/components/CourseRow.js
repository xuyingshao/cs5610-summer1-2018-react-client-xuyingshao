import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import CourseEditor from '../containers/CourseEditor';

export default class CourseRow
    extends React.Component {

    constructor(props) {
        super(props);

        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onDeleteClick = () => {
        this.props.delete(this.props.course.id);
    }

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/course/${this.props.course.id}/edit`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <button className="btn btn-danger">
                        <i className="fa fa-times" onClick={this.onDeleteClick}></i>
                    </button>
                </td>
            </tr>
        );
    }
}