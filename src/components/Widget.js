import React from 'react';
import * as actions from '../actions/WidgetActions';
import {connect} from "react-redux";


const dispatcherToPropsMapper = (dispatch) => ({
    widgetTextChanged: (widgetId, text) => actions.widgetTextChanged(dispatch, widgetId, text),
    selectWidgetType: (widgetId, widgetType) => actions.selectWidgetType(dispatch, widgetId, widgetType),
    deleteWidget: (widgetId) => actions.deleteWidget(dispatch, widgetId),
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize),
    listTypeChanged: (widgetId, listType) => actions.listTypeChanged(dispatch, widgetId, listType),
    widgetNameChanged: (widgetId, name) => actions.widgetNameChanged(dispatch, widgetId, name),
    listItemChanged: (widgetId, listItems) => actions.listItemChanged(dispatch, widgetId, listItems),
    imageUrlChanged: (widgetId, src) => actions.imageUrlChanged(dispatch, widgetId, src),
    linkChanged: (widgetId, href) => actions.linkChanged(dispatch, widgetId, href)
});

const stateToPropsMapper = (state) => ({
    previewMode: state.previewMode
});


const Widget = ({widget, previewMode, dispatch, deleteWidget, selectWidgetType, widgetUp, widgetDown}) => {
    let selectElement;
    return (
        <div className="border border-rounded">
            <div hidden={previewMode} className="row">
                <h2>{widget.displayOrder} {widget.widgetType} widget</h2>
                <button className="btn btn-primary">
                    <i className="fa fa-arrow-up"></i>
                </button>
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
        </div>
    );
};

const WidgetContainer =
    connect(stateToPropsMapper, dispatcherToPropsMapper)(Widget);


// Heading Widget
const Heading = ({widget, previewMode, headingSizeChanged, widgetTextChanged, widgetNameChanged}) => {
    let selectElement;
    let textElement;
    let nameElement;

    return (
        <div>
            <div className="form-group" hidden={previewMode}>
                <input className="form-control container-fluid"
                       placeholder="Heading Text"
                       onChange={() => widgetTextChanged(widget.id, textElement.value)}
                       ref={(node) => (textElement = node)}/>
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
                       placeholder="Widget name"
                       ref={(node) => (nameElement = node)}
                       onChange={() => widgetNameChanged(widget.id, nameElement.value)}/>
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
const Paragraph = ({widget, previewMode, widgetTextChanged, widgetNameChanged}) => {
    let textElement;
    let nameElement;

    return (
        <div>
            <div className="form-group" hidden={previewMode}>
            <textarea className="form-control container-fluid"
                      placeholder="Paragraph Text"
                      ref={(node) => (textElement = node)}
                      onChange={() => widgetTextChanged(widget.id, textElement.value)}/>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"
                       ref={(node) => (nameElement = node)}
                       onChange={() => widgetNameChanged(widget.id, nameElement.value)}/>
            </div>
            <h3>Preview</h3>
            <div>{widget.text}</div>
        </div>
    );
};

const ParagraphContainer = connect(stateToPropsMapper, dispatcherToPropsMapper)(Paragraph);


// List Widget
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
                      onChange={() => listItemChanged(widget.id, textElement.value)}/>
                <br/>
                <select className="form-control"
                        ref={(node) => (selectElement = node)}
                        onChange={() => listTypeChanged(widget.id, selectElement.value)}>
                    <option value="unordered">Unordered list</option>
                    <option value="ordered">Ordered list</option>
                </select>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"
                       ref={(node) => (nameElement = node)}
                       onChange={() => widgetNameChanged(widget.id, nameElement.value)}/>
            </div>
            <h3>Preview</h3>
            {widget.listType === "ordered" && <ol>{renderListItems(widget.listItems)}</ol>}
            {widget.listType === "unordered" && <ul>{renderListItems(widget.listItems)}</ul>}
        </div>
    );
};

const renderListItems = (listItems) => {
    let id = 0;
    return (listItems.split('\n').map(
            (item) => (<li key={id++}>{item}</li>))
    );
};

const ListContainer = connect(stateToPropsMapper, dispatcherToPropsMapper)(List);

// Image Widget
const Image = ({widget, previewMode, widgetNameChanged, imageUrlChanged}) => {
    let srcElement;
    let nameElement;

    return (
        <div>
            <div className="form-group" hidden={previewMode}>
                <input className="form-control container-fluid"
                       placeholder="Image URL"
                       ref={(node) => (srcElement = node)}
                       onChange={() => imageUrlChanged(widget.id, srcElement.value)}/>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"
                       ref={(node) => (nameElement = node)}
                       onChange={() => widgetNameChanged(widget.id, nameElement.value)}/>
            </div>
            <h3>Preview</h3>
            <img src={widget.src}/>
        </div>
    );
};

const ImageContainer = connect(stateToPropsMapper, dispatcherToPropsMapper)(Image);


// Link Widget
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
                       onChange={() => linkChanged(widget.id, linkElement.value)}/>
                <br/>
                <input className="form-control container-fluid"
                       placeholder="Link Text"
                       ref={(node) => (linkTextElement = node)}
                       onChange={() => widgetTextChanged(widget.id, linkTextElement.value)}/>
                <br/>
                <input className="form-control"
                       placeholder="Widget name"
                       ref={(node) => (nameElement = node)}
                       onChange={() => widgetNameChanged(widget.id, nameElement.value)}/>
            </div>
            <h3>Preview</h3>
            <a href={widget.href}>{widget.text}</a>
        </div>
    );
}

const LinkContainer = connect(stateToPropsMapper, dispatcherToPropsMapper)(Link);


export default WidgetContainer;