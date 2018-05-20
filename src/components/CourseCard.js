import React from 'react';

export default class CourseCard
    extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="card" style={{width: '18rem'}}>
                <img className="card-img-top"
                     src="https://picsum.photos/300/200"/>
                <div className="card-body">
                    <h5 className="card-tile">{this.props.title}</h5>
                </div>
            </div>
        );
    }
}