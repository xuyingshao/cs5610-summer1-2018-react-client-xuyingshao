import * as actions from "../actions/WidgetActions";
import {connect} from "react-redux";
import React from "react";

const dispatcherToPropsMapper = (dispatch) => ({
    widgetNameChanged: (widgetId, name) => actions.widgetNameChanged(dispatch, widgetId, name),
    imageUrlChanged: (widgetId, src) => actions.imageUrlChanged(dispatch, widgetId, src),
});

const stateToPropsMapper = (state) => ({
    previewMode: state.previewMode
});

const Image = ({widget, previewMode, widgetNameChanged, imageUrlChanged}) => {
    let srcElement;
    let nameElement;

    return (
        <div>
            <div className="form-group" hidden={previewMode}>
                <input className="form-control container-fluid"
                       placeholder="Image URL"
                       ref={(node) => (srcElement = node)}
                       onChange={() => imageUrlChanged(widget.displayOrder, srcElement.value)}
                       value={widget.src === null ? "" : widget.src}/>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"
                       ref={(node) => (nameElement = node)}
                       onChange={() => widgetNameChanged(widget.displayOrder, nameElement.value)}
                       value={widget.name === null ? "" : widget.name}/>
            </div>
            <h4 hidden={previewMode}>Preview</h4>
            <img src={widget.src}/>
        </div>
    );
};

const ImageWidget = connect(stateToPropsMapper, dispatcherToPropsMapper)(Image);

export default ImageWidget;