import React from 'react';
import {Link} from 'react-router-dom';

export default class ModuleListItem
    extends React.Component {

    constructor(props) {
        super(props);
    }

    onDeleteClick = () => {
        this.props.delete(this.props.module.id);
    }

    render() {
        return (
            <li className="list-group-item">
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}/edit`}
                      onClick={this.props.onClick}>
                    {this.props.title}
                </Link>
                <span className="float-right">
                    <i className="fa fa-trash col-sm-2" onClick={this.onDeleteClick}></i>
                </span>
            </li>
        );
    }
}