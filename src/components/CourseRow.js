import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default class CourseRow
    extends React.Component {

    constructor(props) {
        super(props);
    }

    // deleteCourse() {
    //     this.props.delete();
    // }

    // onDeleteClick = () => {
    //     this.props.delete(this.props.course.id);
    // }

    render() {
        return (
            <tr>
                {/*<Router>*/}
                    {/*<Link to="/course/:this.props.course.id">*/}
                        {/*<td>{this.props.course.title}</td>*/}
                    {/*</Link>*/}
                    {/*<Route path="/course/:courseId" component={CourseEditor}></Route>*/}
                {/*</Router>*/}
                <td>{this.props.course.title}</td>
                <td></td>
                <td></td>
                <td>
                    <button className="btn btn-danger">
                        <i className="fa fa-times"></i>
                    </button>
                </td>
            </tr>
        );
    }
}

// onClick={() => {
//     this.props.delete(this.props.course.id)
// }}

// const CourseRow = () => {
//     return (
//         <tr>
//             <td>{this.props.course.title}</td>
//             <td></td>
//             <td></td>
//             <td>
//                 <button className="btn btn-danger" onClick={this.props.deleteCourse}>
//                     <i className="fa fa-times"></i>
//                 </button>
//             </td>
//         </tr>
//     );
// }

// export default CourseRow;