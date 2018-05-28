import * as constants from "../constants/WidgetConstants";

const COURSE_API_URL = 'http://localhost:8080/api/course';

// export const findAllWidgetsForLesson = (dispatch, courseId, moduleId, lessonId) => {
//         fetch(COURSE_API_URL + '/' + courseId + '/module/' + moduleId + '/lesson/' + lessonId)
//             .then((response) => (response.json))
//             .then((widgets) => (
//                 dispatch({
//                     type: constants.FIND_ALL_WIDGETS_FOR_LESSON,
//                     widgets: widgets
//                 })
//             ))
// };

export const findAllWidgets = (dispatch) => (
    fetch('http://localhost:8080/api/widget')
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

export const switchPreview = (dispatch) => {
    dispatch({
        type: constants.PREVIEW
    });
};

export const listTypeChanged = (dispatch, widgetId, listType) => {
    dispatch({
        type: constants.CHANGE_LIST_TYPE,
        id: widgetId,
        listType: listType
    });
};

export const widgetNameChanged = (dispatch, widgetId, name) => {
    dispatch({
        type: constants.CHANGE_WIDGET_NAME,
        id: widgetId,
        name: name
    });
};

export const listItemChanged = (dispatch, widgetId, listItems) => {
    dispatch({
        type: constants.CHANGE_LIST_ITEMS,
        id: widgetId,
        listItems: listItems
    });
};

export const imageUrlChanged = (dispatch, widgetId, src) => {
    dispatch({
        type: constants.CHANGE_IMAGE_SRC,
        id: widgetId,
        src: src
    });
};

export const linkChanged = (dispatch, widgetId, href) => {
    dispatch({
        type: constants.CHANGE_LINK,
        id: widgetId,
        href: href
    });
};

export const widgetTextChanged = (dispatch, widgetId, text) => {
    dispatch({
        type: constants.CHANGE_WIDGET_TEXT,
        id: widgetId,
        text: text
    });
};

export const saveAllWidgetsForLesson = (dispatch) => {
    dispatch({
        type: constants.SAVE_ALL_WIDGETS_FOR_LESSON,
    })
}