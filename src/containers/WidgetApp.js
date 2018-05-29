import * as actions from "../actions/WidgetActions";
import {connect} from "react-redux";
import React from "react";
import WidgetContainer from "../components/Widget";
import Toggle from 'react-bootstrap-toggle';

class WidgetList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: ''
        };

        // console.log(this.props);
        //
        // console.log(this.props.courseId);
        // console.log(this.props.moduleId);
        // console.log(this.props.lessonId);

        this.props.findAllWidgets();
        // this.props.findAllWidgetsForLesson(582, 742, 642);
    }

    // componentDidMount() {
    //     this.setState({courseId: this.props.courseId});
    //     this.setState({moduleId: this.props.moduleId});
    //     this.setState({lessonId: this.props.lessonId});
    //
    //     // console.log(this.props.courseId);
    //     // console.log(this.props.moduleId);
    //     // console.log(this.props.lessonId);
    // }

    // componentWillReceiveNewProps(newProps) {
    //     this.setState({courseId: newProps.courseId});
    //     this.setState({moduleId: newProps.moduleId});
    //     this.setState({lessonId: newProps.lessonId});
    //
    //     console.log(this.props.courseId);
    //     console.log(this.props.moduleId);
    //     console.log(this.props.lessonId);
    //
    //     this.props.findAllWidgetsForLesson(this.state.lessonId);
    // }

    render() {
        return (
            <div className="col-11">
                <br/>
                <div className="text-right">
                    <button className="btn btn-primary"
                            hidden={this.props.previewMode}
                            onClick={this.props.save}>Save
                    </button>
                    <div className="btn-group">
                        <h5 for="preview-switch">Preview</h5>
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
                    <button className="btn btn-danger" onClick={this.props.addWidget}>
                        <i className="fa fa-plus-circle"></i>
                    </button>
                </div>
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
    findAllWidgetsForLesson: (lessonId) => actions.findAllWidgetsForLesson(dispatch, lessonId),
    addWidget: () => actions.addWidget(dispatch),
    saveAllWidgetsForLesson: () => actions.saveAllWidgetsForLesson(dispatch),
    save: () => actions.save(dispatch),
    switchPreview: () => actions.switchPreview(dispatch)
});

const WidgetApp =
    connect(stateToPropsMapper, dispatcherToPropsMapper)(WidgetList);

export default WidgetApp;