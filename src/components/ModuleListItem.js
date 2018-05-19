import React from 'react';

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
                {this.props.title}
                <span className="float-right">
                    <i className="fa fa-trash col-sm-2" onClick={this.onDeleteClick}></i>
                </span>
            </li>
        );
    }
}