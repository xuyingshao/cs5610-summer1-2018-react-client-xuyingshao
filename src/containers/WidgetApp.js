import * as actions from "../actions/WidgetActions";
import {connect} from "react-redux";
import React from "react";
import WidgetContainer from "../components/Widget";


class WidgetList extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props);

        console.log(this.props.courseId);
        console.log(this.props.moduleId);
        console.log(this.props.lessonId);

        this.props.findAllWidgets();

        // this.props.findAllWidgetsForLesson(582, 742, 642);
    }

    // componentDidMount() {
    //
    // }
    //
    // componentWillReceiveNewProps(newProps) {
    //
    // }

    render() {
        return (
            <div>
                <h1>Widget List {this.props.widgets.length}</h1>
                <div>
                    <button hidden={this.props.previewMode}
                            onClick={this.props.save}>Save
                    </button>
                    <button onClick={this.props.switchPreview}>Preview</button>
                </div>
                <div>
                    {this.props.widgets !== null && this.props.widgets.map((widget) =>
                        (<WidgetContainer key={widget.id}
                                          widget={widget}
                                          previewMode={this.props.previewMode}
                                          widgetLength={this.props.widgets.length}/>))}
                </div>
                <button onClick={this.props.addWidget}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>
        );
    }
}

const stateToPropsMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.previewMode
});

const dispatcherToPropsMapper = (dispatch) => ({
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    // findAllWidgetsForLesson: (courseId, moduleId, lessonId) =>
    //     actions.findAllWidgetsForLesson(dispatch, courseId, moduleId, lessonId),
    addWidget: () => actions.addWidget(dispatch),
    saveAllWidgetsForLesson: () => actions.saveAllWidgetsForLesson(dispatch),
    save: () => actions.save(dispatch),
    switchPreview: () => actions.switchPreview(dispatch)
});

const WidgetApp =
    connect(stateToPropsMapper, dispatcherToPropsMapper)(WidgetList);

export default WidgetApp;