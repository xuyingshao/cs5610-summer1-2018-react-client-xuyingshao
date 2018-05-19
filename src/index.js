import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import CourseManager from './containers/CourseManager';
import CourseRow from "./components/CourseRow";


ReactDOM.render(
    <CourseManager/>,
    document.getElementById("root")
);