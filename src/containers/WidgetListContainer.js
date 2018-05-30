import * as actions from "../actions/WidgetActions";
import {connect} from "react-redux";
import React from "react";
import WidgetContainer from "../components/Widget";
import Toggle from 'react-bootstrap-toggle';
import * as constants from "../constants/WidgetConstants";

const LESSON_API_URL = 'http://localhost:8080/api/lesson';

class WidgetList extends React.Component {
    constructor(props) {
        super(props);

        this.props.findAllWidgetsForLesson(this.props.lessonId);
    }

    // componentDidMount() {
    //     console.log(this.props.lessonId);
    //     this.props.findAllWidgetsForLesson(this.props.lessonId);
    // }

    componentWillReceiveProps(newProps) {
        if (newProps.lessonId !== this.props.lessonId) {
            this.props.findAllWidgetsForLesson(newProps.lessonId);
        }
    }

    render() {
        return (
            <div className="col-11">
                <br/>

                    <h3 className="text-left">Lesson title: {this.props.lesson.title}</h3>
                    <div className="text-right">
                        <button className="btn btn-secondary"
                                hidden={this.props.previewMode}
                                onClick={() => this.props.saveAllWidgetsForLesson(this.props.lessonId)}>Save
                        </button>
                        <div className="btn-group">
                            <h5>Preview</h5>
                            <label className="switch" id="preview-switch">
                                <input type="checkbox" onClick={this.props.switchPreview}/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>

                <br/>
                <div>
                    {this.props.widgets !== null &&
                    this.props.widgets.sort((a, b) => (a.displayOrder - b.displayOrder)).map((widget) =>
                        (<WidgetContainer key={widget.displayOrder}
                                          widget={widget}
                                          previewMode={this.props.previewMode}
                                          widgetLength={this.props.widgets.length}/>))}
                </div>
                <br/>
                <div className="text-right">
                    <button className="btn btn-secondary" onClick={this.props.addWidget}>
                        <i className="fa fa-plus-circle"></i>
                    </button>
                </div>
            </div>
        );
    }
}

const stateToPropsMapper = (state, ownProps) => {
    return {
        widgets: state.widgets,
        previewMode: state.previewMode,
        courseId: ownProps.courseId,
        moduleId: ownProps.moduleId,
        lessonId: ownProps.lessonId,
        lesson: ownProps.lesson
    };
};

const dispatcherToPropsMapper = (dispatch) => ({
    // findAllWidgets: () => actions.findAllWidgets(dispatch),
    findAllWidgetsForLesson: (lessonId) => actions.findAllWidgetsForLesson(dispatch, lessonId),
    addWidget: () => actions.addWidget(dispatch),
    saveAllWidgetsForLesson: (lessonId) => actions.saveAllWidgetsForLesson(dispatch, lessonId),
    // save: () => actions.save(dispatch),
    switchPreview: () => actions.switchPreview(dispatch)
});

const WidgetListContainer =
    connect(stateToPropsMapper, dispatcherToPropsMapper)(WidgetList);

export default WidgetListContainer;