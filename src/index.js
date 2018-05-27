import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import CourseManager from './containers/CourseManager';
import './style.css';
import WidgetApp from "./containers/WidgetApp";
import {createStore} from "redux";
import Provider from "react-redux/es/components/Provider";
import WidgetReducer from "./reducers/WidgetReducer";


// ReactDOM.render (
//     <CourseManager/>,
//     document.getElementById("root")
// );

let widgetStore = createStore(WidgetReducer);

ReactDOM.render(
    <Provider store={widgetStore}>
        <WidgetApp/>
    </Provider>,
    document.getElementById("root")
);