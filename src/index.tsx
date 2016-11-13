import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from "redux";
import {City, CityStore} from "./types";
import { List } from "Immutable";
import { Provider } from "react-redux";
import appReducer from "./reducers/app.reducer";

import { App } from "./components/App";

const store : CityStore = createStore(appReducer);

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById("root")
    );
}

store.subscribe(render);
render();
