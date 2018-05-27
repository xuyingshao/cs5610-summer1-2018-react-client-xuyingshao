import React from 'react';
import * as actions from '../actions/WidgetActions';
import {connect} from "react-redux";


const dispatcherToPropsMapper = (dispatch) => ({
    selectWidgetType: (widgetId, widgetType) => actions.selectWidgetType(dispatch, widgetId, widgetType),
    deleteWidget: (widgetId) => actions.deleteWidget(dispatch, widgetId),
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize),
    headingTextChanged: (widgetId, text) => actions.headingTextChanged(dispatch, widgetId, text),
    paragraphTextChanged: (widgetId, text) => actions.paragraphTextChanged(dispatch, widgetId, text),
    listTypeChanged: (widgetId, listType) => actions.listTypeChanged(dispatch, widgetId, listType)
});

const stateToPropsMapper = (state) => ({
    previewMode: state.previewMode
});


const Widget = ({widget, previewMode, dispatch, deleteWidget, selectWidgetType}) => {
    let selectElement;
    return (
        <li>
            <div hidden={previewMode} className="row">
                <h2>{widget.id} {widget.widgetType} widget</h2>
                <button className="btn btn-primary"><i className="fa fa-arrow-up"></i></button>
                <button className="btn btn-primary"><i className="fa fa-arrow-down"></i></button>
                <select value={widget.widgetType}
                        onChange={() => selectWidgetType(widget.id, selectElement.value)}
                        ref={(node) => (selectElement = node)}>
                    <option>Heading</option>
                    <option>Paragraph</option>
                    <option>List</option>
                    <option>Image</option>
                    <option>Link</option>
                </select>
                <button onClick={() => deleteWidget(widget.id)}>
                    Delete
                </button>
            </div>
            <div>
                {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType === 'List' && <ListContainer widget={widget}/>}
                {widget.widgetType === 'Image' && <ImageContainer widget={widget}/>}
                {widget.widgetType === 'Link' && <LinkContainer widget={widget}/>}
            </div>
        </li>
    );
};

const WidgetContainer =
    connect(stateToPropsMapper, dispatcherToPropsMapper)(Widget);


// Heading Widget
const Heading = ({widget, previewMode, headingSizeChanged, headingTextChanged}) => {
    let selectElement;
    let inputElement;
    return (
        <div>
            <div className="form-group" hidden={previewMode}>
                <input className="form-control container-fluid"
                       placeholder="Heading Text"
                       onChange={() => headingTextChanged(widget.id, inputElement.value)}
                       value={widget.text}
                       ref={(node) => (inputElement = node)}/>
                <br/>
                <select className="form-control"
                        onChange={() => headingSizeChanged(widget.id, selectElement.value)}
                        value={widget.size}
                        ref={(node) => (selectElement = node)}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"/>
            </div>
            <h3>Preview</h3>
            {widget.size === '1' && <h1>{widget.text}</h1>}
            {widget.size === '2' && <h2>{widget.text}</h2>}
            {widget.size === '3' && <h3>{widget.text}</h3>}
        </div>
    );
};

const HeadingContainer = connect(stateToPropsMapper, dispatcherToPropsMapper)(Heading);


// Paragraph Widget
const Paragraph = ({widget, previewMode, paragraphTextChanged}) => {
    let textElement;
    return (
        <div>
            <div className="form-group" hidden={previewMode}>
            <textarea className="form-control container-fluid"
                      placeholder="Paragraph Text"
                      ref={(node) => (textElement = node)}
                      onChange={() => paragraphTextChanged(widget.id, textElement.value)}/>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"/>
            </div>
            <h3>Preview</h3>
            <div>{widget.text}</div>
        </div>
    );
};

const ParagraphContainer = connect(stateToPropsMapper, dispatcherToPropsMapper)(Paragraph);


// List Widget
const List = ({widget, previewMode, listTypeChanged}) => {
    let selectElement;
    return (
        <div>
            <div className="form-group" hidden={previewMode}>
            <textarea className="form-control container-fluid"
                      placeholder="Put each item in a separate row"/>
                <br/>
                <select className="form-control"
                        ref={(node) => (selectElement = node)}
                        onChange={() => listTypeChanged(widget.id, selectElement.value)}>
                    <option value="unordered">Unordered list</option>
                    <option value="ordered">Ordered list</option>
                </select>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"/>
            </div>
            <h3>Preview</h3>
            {widget.listType}
            {/*{widget.listType === "ordered" &&}*/}
            {/*{widget.listType === "unordered" &&}*/}
        </div>
    );
};

const ListContainer = connect(stateToPropsMapper, dispatcherToPropsMapper)(List);

// Image Widget
const Image = ({widget, previewMode}) => {
    return (
        <div>
            <div className="form-group" hidden={previewMode}>
                <input className="form-control container-fluid"
                       placeholder="http://lorempixel.com/300/150"/>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"/>
            </div>
            <h3>Preview</h3>
        </div>
    );
};

const ImageContainer = connect(stateToPropsMapper, dispatcherToPropsMapper)(Image);


// Link Widget
const Link = ({widget, previewMode}) => {
    return (
        <div>
            <div className="form-group" hidden={previewMode}>
                <input className="form-control container-fluid"
                       placeholder="Link URL"/>
                <br/>
                <input className="form-control container-fluid"
                       placeholder="Link Text"/>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"/>
            </div>
            <h3>Preview</h3>
        </div>
    );
}

const LinkContainer = connect(stateToPropsMapper, dispatcherToPropsMapper)(Link);


export default WidgetContainer;