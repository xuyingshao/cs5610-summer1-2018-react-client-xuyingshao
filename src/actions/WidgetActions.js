import * as constants from "../constants/WidgetConstants";

const WIDGET_API_URL = "http://localhost:8080/api/widget";
const LESSON_API_URL = 'http://localhost:8080/api/lesson';

export const findAllWidgetsForLesson = (dispatch, lessonId) => {
    fetch(LESSON_API_URL + '/' + lessonId + '/widget')
        .then((response) => (response.json()))
        .then((widgets) => (
            dispatch({
                type: constants.FIND_ALL_WIDGETS_FOR_LESSON,
                widgets: widgets,
            })
        ))
};

export const findAllWidgets = (dispatch) => (
    fetch(WIDGET_API_URL)
        .then((response) => (response.json()))
        .then((widgets) => (
            dispatch({
                type: constants.FIND_ALL_WIDGETS,
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
            displayOrder: widgetId,
            size: newSize
        });
};

export const deleteWidget = (dispatch, widgetId) => {
    dispatch({
        type: constants.DELETE_WIDGET,
        displayOrder: widgetId
    });
};

export const selectWidgetType = (dispatch, widgetId, widgetType) => {
    dispatch({
        type: constants.SELECT_WIDGET_TYPE,
        displayOrder: widgetId,
        widgetType: widgetType
    });
};

export const switchPreview = (dispatch) => {
    dispatch({
        type: constants.PREVIEW
    });
};

export const listTypeChanged = (dispatch, widgetId, listType) => {
    dispatch({
        type: constants.CHANGE_LIST_TYPE,
        displayOrder: widgetId,
        listType: listType
    });
};

export const widgetNameChanged = (dispatch, widgetId, name) => {
    dispatch({
        type: constants.CHANGE_WIDGET_NAME,
        displayOrder: widgetId,
        name: name
    });
};

export const listItemChanged = (dispatch, widgetId, listItems) => {
    dispatch({
        type: constants.CHANGE_LIST_ITEMS,
        displayOrder: widgetId,
        listItems: listItems
    });
};

export const imageUrlChanged = (dispatch, widgetId, src) => {
    dispatch({
        type: constants.CHANGE_IMAGE_SRC,
        displayOrder: widgetId,
        src: src
    });
};

export const linkChanged = (dispatch, widgetId, href) => {
    dispatch({
        type: constants.CHANGE_LINK,
        displayOrder: widgetId,
        href: href
    });
};

export const widgetTextChanged = (dispatch, widgetId, text) => {
    dispatch({
        type: constants.CHANGE_WIDGET_TEXT,
        displayOrder: widgetId,
        text: text
    });
};

export const saveAllWidgetsForLesson = (dispatch, lessonId) => {
    dispatch({
        type: constants.SAVE_ALL_WIDGETS_FOR_LESSON,
        lessonId: lessonId
    })
};

export const widgetUp = (dispatch, widgetId) => {
    dispatch({
        type: constants.WIDGET_UP,
        displayOrder: widgetId
    });
};


export const widgetDown = (dispatch, widgetId) => {
    dispatch({
        type: constants.WIDGET_DOWN,
        displayOrder: widgetId
    });
};
