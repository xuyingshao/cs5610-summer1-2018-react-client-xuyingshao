import * as actions from "../actions/WidgetActions";
import {connect} from "react-redux";
import React from 'react';

const dispatcherToPropsMapper = (dispatch) => ({
    widgetTextChanged: (widgetId, text) => actions.widgetTextChanged(dispatch, widgetId, text),
    widgetNameChanged: (widgetId, name) => actions.widgetNameChanged(dispatch, widgetId, name)
});

const stateToPropsMapper = (state) => ({
    previewMode: state.previewMode
});

const Paragraph = ({widget, previewMode, widgetTextChanged, widgetNameChanged}) => {
    let textElement;
    let nameElement;

    return (
        <div>
            <div className="form-group" hidden={previewMode}>
    <textarea className="form-control container-fluid"
              placeholder="Paragraph Text"
              ref={(node) => (textElement = node)}
              onChange={() => widgetTextChanged(widget.displayOrder, textElement.value)}
              value={widget.text === null ? "" : widget.text}/>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"
                       ref={(node) => (nameElement = node)}
                       onChange={() => widgetNameChanged(widget.displayOrder, nameElement.value)}
                       value={widget.name === null ? "" : widget.name}/>
            </div>
            <h4 hidden={previewMode}>Preview</h4>
            <div>{widget.text}</div>
        </div>
    );
};

const ParagraphWidget = connect(stateToPropsMapper, dispatcherToPropsMapper)(Paragraph);

export default ParagraphWidget;