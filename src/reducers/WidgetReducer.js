import * as constants from "../constants/WidgetConstants";

// const WIDGET_API_URL = "http://localhost:8080/api/widget";
// const LESSON_API_URL = 'http://localhost:8080/api/lesson';

const WIDGET_API_URL = 'https://course-manager-jeanne.herokuapp.com/api/widget';
const LESSON_API_URL = 'https://course-manager-jeanne.herokuapp.com/api/lesson';

const WidgetReducer = (state = {widgets: [], previewMode: false}, action) => {
        let newState;

        switch (action.type) {
            case constants.DELETE_WIDGET:
                newState = {
                    widgets: state.widgets.filter((widget) => (widget.displayOrder !== action.displayOrder))
                };
                if (action.displayOrder === state.widgets.length) {
                    return newState;
                }
                else {
                    newState.widgets.map((widget) => {
                        if (widget.displayOrder > action.displayOrder) {
                            widget.displayOrder--;
                        }
                    });
                    return newState;
                }
            case constants.ADD_WIDGET:
                // state.widgets = state.widgets.map((widget) => {
                //     widget.previewMode = true;
                //     return Object.assign({}, widget);
                // })
                return {
                    widgets: [
                        ...state.widgets,
                        {displayOrder: ++state.widgets.length, widgetType: 'Heading'}
                    ]
                };

            case constants.FIND_ALL_WIDGETS:
                // newState = Object.assign({}, state);
                // newState.widgets = action.widgets;
                // newState.previewMode = action.previewMode;
                // return newState;
                return {
                    widgets: action.widgets
                }
            case constants.FIND_ALL_WIDGETS_FOR_LESSON:
                return {
                    widgets: action.widgets
                }
            case constants.SAVE:
                fetch(WIDGET_API_URL + '/save', {
                    method: 'post',
                    body: JSON.stringify(state.widgets),
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                return state;
            case constants.SAVE_ALL_WIDGETS_FOR_LESSON:
                fetch(LESSON_API_URL + action.lessonId + "/widget/save", {
                    method: 'post',
                    body: JSON.stringify(state.widgets),
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                return state;
            case constants.SELECT_WIDGET_TYPE:
                newState = {
                    widgets: state.widgets.filter((widget) => {
                        if (widget.displayOrder === action.displayOrder) {
                            widget.widgetType = action.widgetType
                        }
                        return true;
                    })
                };
                return JSON.parse(JSON.stringify(newState));
            case constants.CHANGE_HEADING_SIZE:
                return {
                    widgets: state.widgets.map((widget) => {
                        if (widget.displayOrder === action.displayOrder) {
                            widget.size = action.size
                        }
                        return Object.assign({}, widget);
                    })
                };
            case constants.PREVIEW:
                newState = Object.assign({}, state);
                newState.previewMode = !state.previewMode;
                return newState;
            case constants.CHANGE_LIST_TYPE:
                return {
                    widgets: state.widgets.map((widget) => {
                        if (widget.displayOrder === action.displayOrder) {
                            widget.listType = action.listType;
                        }
                        return Object.assign({}, widget);
                    })
                };
            case constants.CHANGE_WIDGET_NAME:
                return {
                    widgets: state.widgets.map((widget) => {
                        if (widget.displayOrder === action.displayOrder) {
                            widget.name = action.name;
                        }
                        return Object.assign({}, widget);
                    })
                };
            case constants.CHANGE_LIST_ITEMS:
                return {
                    widgets: state.widgets.map((widget) => {
                        if (widget.displayOrder === action.displayOrder) {
                            widget.listItems = action.listItems;
                        }
                        return Object.assign({}, widget);
                    })
                };
            case constants.CHANGE_IMAGE_SRC:
                return {
                    widgets: state.widgets.map((widget) => {
                        if (widget.displayOrder === action.displayOrder) {
                            widget.src = action.src;
                        }
                        return Object.assign({}, widget);
                    })
                };
            case constants.CHANGE_LINK:
                return {
                    widgets: state.widgets.map((widget) => {
                        if (widget.displayOrder === action.displayOrder) {
                            widget.href = action.href;
                        }
                        return Object.assign({}, widget);
                    })
                };
            case constants.CHANGE_WIDGET_TEXT:
                return {
                    widgets: state.widgets.map((widget) => {
                        if (widget.displayOrder === action.displayOrder) {
                            widget.text = action.text;
                        }
                        return Object.assign({}, widget);
                    })
                };
            case constants.WIDGET_UP:
                if (action.displayOrder === 1) {
                    newState = state;
                }
                else {
                    newState = {
                        widgets: state.widgets.map((widget) => {
                            if (widget.displayOrder === action.displayOrder) {
                                widget.displayOrder = state.widgets.length + 1;
                            }
                            if (widget.displayOrder === action.displayOrder - 1) {
                                widget.displayOrder++;
                            }
                            return Object.assign({}, widget);
                        })
                    }
                    newState = {
                        widgets: newState.widgets.map((widget) => {
                            if (widget.displayOrder === state.widgets.length + 1) {
                                widget.displayOrder = action.displayOrder - 1;
                            }
                            return Object.assign({}, widget);
                        })
                    }
                }
                return newState;
            case constants.WIDGET_DOWN:
                if (action.displayOrder === state.widgets.length) {
                    newState = state;
                }
                else {
                    newState = {
                        widgets: state.widgets.map((widget) => {
                            if (widget.displayOrder === action.displayOrder) {
                                widget.displayOrder = -1;
                            }
                            if (widget.displayOrder === action.displayOrder + 1) {
                                widget.displayOrder--;
                            }
                            return Object.assign({}, widget);
                        })
                    }
                    newState = {
                        widgets: state.widgets.map((widget) => {
                            if (widget.displayOrder === -1) {
                                widget.displayOrder = action.displayOrder + 1;
                            }
                            return Object.assign({}, widget);
                        })
                    }
                    return newState;
                }
            default:
                return state;
        }
    };

export default WidgetReducer;