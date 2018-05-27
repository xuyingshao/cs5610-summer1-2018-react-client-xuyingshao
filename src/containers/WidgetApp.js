import * as actions from "../actions/WidgetActions";
import {connect} from "react-redux";
import React from "react";
import WidgetContainer from "../components/Widget";


class WidgetList extends React.Component {
    constructor(props) {
        super(props);
        this.props.findAllWidgets();
    }

    render() {
        return (
            <div>
                <h1>Widget List {this.props.widgets.length}</h1>
                <div className="float-right">
                    <button hidden={this.props.previewMode}
                            onClick={this.props.save}>Save
                    </button>
                    <button onClick={this.props.switchPreview}>Preview</button>
                </div>
                <ul>
                    {this.props.widgets.map((widget) =>
                        (<WidgetContainer key={widget.id}
                                          widget={widget}
                                          previewMode={this.props.previewMode}/>))}
                </ul>
                <button onClick={this.props.addWidget}>
                    Add Widget
                </button>
            </div>
        );
    }
}

const stateToPropsMapper = (state) => ({
        widgets: state.widgets,
        previewMode: state.previewMode
    });

const dispatcherToPropsMapper = (dispatch) => ({
        findAllWidgets: () => actions.findAllWidgets(dispatch),
        addWidget: () => actions.addWidget(dispatch),
        save: () => actions.save(dispatch),
        switchPreview: () => actions.switchPreview(dispatch)

    });

const App =
    connect(stateToPropsMapper, dispatcherToPropsMapper)(WidgetList);

export default App;