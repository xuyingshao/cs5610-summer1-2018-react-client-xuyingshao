import * as actions from "../actions/WidgetActions";
import {connect} from "react-redux";
import React from "react";

const dispatcherToPropsMapper = (dispatch) => ({
    widgetNameChanged: (widgetId, name) => actions.widgetNameChanged(dispatch, widgetId, name),
    listTypeChanged: (widgetId, listType) => actions.listTypeChanged(dispatch, widgetId, listType),
    listItemChanged: (widgetId, listItems) => actions.listItemChanged(dispatch, widgetId, listItems),
});

const stateToPropsMapper = (state) => ({
    previewMode: state.previewMode
});

const List = ({widget, previewMode, listTypeChanged, widgetNameChanged, listItemChanged}) => {
    let textElement
    let selectElement;
    let nameElement;

    return (
        <div>
            <div className="form-group" hidden={previewMode}>
            <textarea className="form-control container-fluid"
                      placeholder="Put each item in a separate row"
                      ref={(node) => (textElement = node)}
                      onChange={() => listItemChanged(widget.displayOrder, textElement.value)}
                      value={widget.listItems === null ? "" : widget.listItems}/>
                <br/>
                <select className="form-control"
                        ref={(node) => (selectElement = node)}
                        onChange={() => listTypeChanged(widget.displayOrder, selectElement.value)}
                        value={widget.listType === null ? "UNORDERED" : widget.listType}>
                    <option value="UNORDERED">Unordered list</option>
                    <option value="ORDERED">Ordered list</option>
                </select>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"
                       ref={(node) => (nameElement = node)}
                       onChange={() => widgetNameChanged(widget.displayOrder, nameElement.value)}
                       value={widget.name === null ? "" : widget.name}/>
            </div>
            <h4 hidden={previewMode}>Preview</h4>
            {widget.listType === "ORDERED" && <ol>{renderListItems(widget.listItems)}</ol>}
            {widget.listType === "UNORDERED" && <ul>{renderListItems(widget.listItems)}</ul>}
        </div>
    );
};

const renderListItems = (listItems) => {
    let id = 0;
    return (listItems.split('\n').map(
            (item) => (<li key={id++}>{item}</li>))
    );
};

const ListWidget = connect(stateToPropsMapper, dispatcherToPropsMapper)(List);

export default ListWidget;