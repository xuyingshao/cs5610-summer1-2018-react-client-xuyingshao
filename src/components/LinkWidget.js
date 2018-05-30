import * as actions from "../actions/WidgetActions";
import {connect} from "react-redux";
import React from "react";

const dispatcherToPropsMapper = (dispatch) => ({
    widgetTextChanged: (widgetId, text) => actions.widgetTextChanged(dispatch, widgetId, text),
    widgetNameChanged: (widgetId, name) => actions.widgetNameChanged(dispatch, widgetId, name),
    linkChanged: (widgetId, href) => actions.linkChanged(dispatch, widgetId, href)
});

const stateToPropsMapper = (state) => ({
    previewMode: state.previewMode
});

const Link = ({widget, previewMode, widgetNameChanged, linkChanged, widgetTextChanged}) => {
    let linkElement;
    let linkTextElement;
    let nameElement;

    return (
        <div>
            <div className="form-group" hidden={previewMode}>
                <input className="form-control container-fluid"
                       placeholder="Link URL"
                       ref={(node) => (linkElement = node)}
                       onChange={() => linkChanged(widget.displayOrder, linkElement.value)}
                       value={widget.href === null ? "" : widget.href}/>
                <br/>
                <input className="form-control container-fluid"
                       placeholder="Link Text"
                       ref={(node) => (linkTextElement = node)}
                       onChange={() => widgetTextChanged(widget.displayOrder, linkTextElement.value)}
                       value={widget.text === null ? "" : widget.text}/>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"
                       ref={(node) => (nameElement = node)}
                       onChange={() => widgetNameChanged(widget.displayOrder, nameElement.value)}
                       value={widget.name === null ? "" : widget.name}/>
            </div>
            <h4 hidden={previewMode}>Preview</h4>
            <a href={widget.href}>{widget.text}</a>
        </div>
    );
}

const LinkWidget = connect(stateToPropsMapper, dispatcherToPropsMapper)(Link);

export default LinkWidget;