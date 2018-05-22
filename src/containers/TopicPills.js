import React from 'react';

export default class TopicPills
    extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <br/>
                <ul className="nav nav-pills">
                    <li className="nav-item active">
                        <a className="nav-link active" href="#">Topic 1</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Topic 2</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Topic 3</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Topic 4</a>
                    </li>
                </ul>
            </div>
        );
    }
}