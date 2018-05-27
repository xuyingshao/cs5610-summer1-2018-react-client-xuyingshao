import * as constants from "../constants/WidgetConstants";

export const findAllWidgets = (dispatch) => (
    fetch('http://localhost:8080/api/widget')
        .then((response) => (response.json()))
        .then((widgets) => (
            dispatch({
                type:constants.FIND_ALL_WIDGETS,
                widgets: widgets
            })
        ))
);

export const addWidget = (dispatch) => {
    dispatch(
        {type: constants.ADD_WIDGET}
    );
};

export const save = (dispatch) => {
    dispatch(
        {type: constants.SAVE}
    );
};

export const headingSizeChanged = (dispatch, widgetId, newSize) => {
    dispatch(
        {
            type: constants.CHANGE_HEADING_SIZE,
            id: widgetId,
            size: newSize
        });
};

export const deleteWidget = (dispatch, widgetId) => {
    dispatch({
        type: constants.DELETE_WIDGET,
        id: widgetId
    });
};

export const selectWidgetType = (dispatch, widgetId, widgetType) => {
    dispatch({
        type: constants.SELECT_WIDGET_TYPE,
        id: widgetId,
        widgetType: widgetType
    });
};

export const headingTextChanged = (dispatch, widgetId, newText) => {
    dispatch({
        type: constants.CHANGE_HEADING_TEXT,
        id: widgetId,
        text: newText
    });
};

export const switchPreview = (dispatch) => {
    dispatch({
        type: constants.PREVIEW
    });
};

export const paragraphTextChanged = (dispatch, widgetId, text) => {
    dispatch({
        type: constants.CHANGE_PARAGRAPH_TEXT,
        id: widgetId,
        text: text
    });
};

export const listTypeChanged = (dispatch, widgetId, listType) => {
    dispatch({
        type: constants.CHANGE_LIST_TYPE,
        id: widgetId,
        listType: listType
    });
}