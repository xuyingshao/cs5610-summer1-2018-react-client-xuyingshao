import React from 'react';

export default class CourseRow
    extends React.Component {

    constructor(props) {
        super(props);

        this.deleteCourse = this.deleteCourse.bind(this);
    }

    // FIXME, deleteCourse event handler in CourseList
    deleteCourse() {
        console.log('delete');
    }

    render() {
        return (
            <div className="row">
                <h1>{this.props.title}</h1>

                <button className="btn btn-danger btn-medium" onClick={this.deleteCourse}>
                    <i className="fa fa-times"></i>
                </button>
            </div>
        );
    }
}