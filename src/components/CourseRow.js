import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import CourseEditor from '../containers/CourseEditor';

export default class CourseRow
    extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modified: ''
        };

        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onDeleteClick = () => {
        this.props.delete(this.props.course.id);
    }

    setTimeFormat(date) {
        if (date === null) {
            return;
        }

        let d = new Date(date);
        let today = new Date();

        if (d.getMonth() === today.getMonth() && d.getDay() === today.getDay()) {
            let hour = d.getHours();
            if (hour == 12) {
                return hour + ":" + d.getMinutes() + ' PM';
            }
            else if (hour > 12) {
                return (hour - 12) + ':' + d.getMinutes() + ' PM';
            }
            return d.getHours() + ':' + d.getMinutes() + ' AM';
        }
        else {
            return new Intl.DateTimeFormat('en-US').format(d);
        }
    }

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/course/${this.props.course.id}/edit`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td>me</td>
                <td>{this.setTimeFormat(this.props.course.modified)}</td>
                <td>
                    <button className="btn btn-outline-danger">
                        <i className="fa fa-trash" onClick={this.onDeleteClick}></i>
                    </button>
                </td>
            </tr>
        );
    }
}