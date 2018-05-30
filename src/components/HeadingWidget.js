import {connect} from "react-redux";
import * as actions from "../actions/WidgetActions";
import React from "react";

const dispatcherToPropsMapper = (dispatch) => ({
    widgetTextChanged: (widgetId, text) => actions.widgetTextChanged(dispatch, widgetId, text),
    widgetNameChanged: (widgetId, name) => actions.widgetNameChanged(dispatch, widgetId, name),
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize)
});

const stateToPropsMapper = (state) => ({
    previewMode: state.previewMode
});

const
    Heading = ({widget, previewMode, headingSizeChanged, widgetTextChanged, widgetNameChanged}) => {
        let selectElement;
        let textElement;
        let nameElement;

        return (
            <div>
                <div className="form-group" hidden={previewMode}>
                    <input className="form-control container-fluid"
                           placeholder="Heading Text"
                           onChange={() => widgetTextChanged(widget.displayOrder, textElement.value)}
                           ref={(node) => (textElement = node)}
                           value={widget.text}/>
                    <br/>
                    <select className="form-control"
                            onChange={() => headingSizeChanged(widget.displayOrder, selectElement.value)}
                            value={widget.size}
                            ref={(node) => (selectElement = node)}>
                        {/*<option value="1" selcted hidden>Choose heading size</option>*/}
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                    </select>
                    <br/>
                    <input className="form-control"
                           placeholder="Widget name"
                           ref={(node) => (nameElement = node)}
                           onChange={() => widgetNameChanged(widget.displayOrder, nameElement.value)}
                           value={widget.name}/>
                </div>
                <h4 hidden={previewMode}>Preview</h4>
                {widget.size === '1' && <h1>{widget.text}</h1>}
                {widget.size === '2' && <h2>{widget.text}</h2>}
                {widget.size === '3' && <h3>{widget.text}</h3>}
            </div>
        );
    };

const HeadingWidget = connect(stateToPropsMapper, dispatcherToPropsMapper)(Heading);

export default HeadingWidget;