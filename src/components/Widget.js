import React from 'react';
import * as actions from '../actions/WidgetActions';
import {connect} from "react-redux";
import HeadingWidget from "./HeadingWidget";
import ParagraphWidget from "./ParagraphWidget";
import ListWidget from "./ListWidget";
import ImageWidget from "./ImageWidget";
import LinkWidget from "./LinkWidget";


const dispatcherToPropsMapper = (dispatch) => ({
    selectWidgetType: (widgetId, widgetType) => actions.selectWidgetType(dispatch, widgetId, widgetType),
    deleteWidget: (widgetId) => actions.deleteWidget(dispatch, widgetId),
    widgetUp: (widgetId) => actions.widgetUp(dispatch, widgetId),
    widgetDown: (widgetId) => actions.widgetDown(dispatch, widgetId)
});

const stateToPropsMapper = (state) => ({
    previewMode: state.previewMode
});


const Widget = ({widget, previewMode, dispatch, deleteWidget,
                    selectWidgetType, widgetUp, widgetDown, widgetLength}) => {
    let selectElement;
    return (
        <div className="form-control">
            <div className="row">
                <h3 hidden={previewMode} className="col-7">
                    {widget.displayOrder}. {widget.widgetType} widget
                </h3>
                <button className="btn btn-success" hidden={!previewMode}>
                    Edit
                </button>
                <div className="btn-group">
                    {widget.displayOrder !== 1 && <button className="btn btn-warning"
                    onClick={() => widgetUp(widget.displayOrder)}>
                    <i className="fa fa-arrow-up"></i>
                    </button>}
                    {widget.displayOrder !== widgetLength && <button className="btn btn-warning"
                    onClick={() => widgetDown(widget.displayOrder)}>
                    <i className="fa fa-arrow-down"></i>
                    </button>}
                    {/*<button hidden={previewMode} className="btn btn-warning"*/}
                            {/*onClick={() => widgetUp(widget.displayOrder)}>*/}
                        {/*<i className="fa fa-arrow-up"></i>*/}
                    {/*</button>*/}
                    {/*<button  hidden={previewMode} className="btn btn-warning"*/}
                            {/*onClick={() => widgetDown(widget.displayOrder)}>*/}
                        {/*<i className="fa fa-arrow-down"></i>*/}
                    {/*</button>*/}
                    <select hidden={previewMode}
                        value={widget.widgetType}
                        onChange={() => selectWidgetType(widget.displayOrder, selectElement.value)}
                        ref={(node) => (selectElement = node)}>
                        <option>Heading</option>
                        <option>Paragraph</option>
                        <option>List</option>
                        <option>Image</option>
                        <option>Link</option>
                    </select>
                    <button hidden={previewMode} className="btn btn-danger"
                            onClick={() => deleteWidget(widget.displayOrder)}>
                        <i className="fa fa-times-circle"></i>
                    </button>
                </div>
            </div>
            <div>
                {widget.widgetType === 'Heading' && <HeadingWidget widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <ParagraphWidget widget={widget}/>}
                {widget.widgetType === 'List' && <ListWidget widget={widget}/>}
                {widget.widgetType === 'Image' && <ImageWidget widget={widget}/>}
                {widget.widgetType === 'Link' && <LinkWidget widget={widget}/>}
            </div>
        </div>
    );
};

const WidgetContainer =
    connect(stateToPropsMapper, dispatcherToPropsMapper)(Widget);

export default WidgetContainer;