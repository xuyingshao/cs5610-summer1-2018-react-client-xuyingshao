import * as constants from "../constants/WidgetConstants";

let idAutoIncrement = 3;

const WidgetReducer = (state = {widgets: [], previewMode: false}, action,) => {
    let newState;

    switch (action.type) {
        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter((widget) => (widget.id !== action.id))
            };
        case constants.ADD_WIDGET:
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
            fetch("http://localhost:8080/api/widget/save", {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            });
            return state;
        // case constants.SAVE_ALL_WIDGETS_FOR_LESSON:

        case constants.SELECT_WIDGET_TYPE:
            newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            };
            return JSON.parse(JSON.stringify(newState));
        case constants.CHANGE_HEADING_SIZE:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.PREVIEW:
            newState = Object.assign({}, state);
            newState.previewMode = !state.previewMode;
            console.log(newState.previewMode);
            return newState;
        case constants.CHANGE_LIST_TYPE:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.listType = action.listType;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.CHANGE_WIDGET_NAME:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.name = action.name;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.CHANGE_LIST_ITEMS:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.listItems = action.listItems;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.CHANGE_IMAGE_SRC:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.src = action.src;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.CHANGE_LINK:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.href = action.href;
                    }
                    return Object.assign({}, widget);
                })
            };
        case constants.CHANGE_WIDGET_TEXT:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.text = action.text;
                    }
                    return Object.assign({}, widget);
                })
            };
        default:
            return state;
    }
};

export default WidgetReducer;