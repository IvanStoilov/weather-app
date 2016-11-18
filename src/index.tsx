import './polyfills';

import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { City } from "./data/city";
import { CityStore } from "./data/city-store";
import { List } from "immutable";
import { Provider } from "react-redux";
import appReducer from "./reducers/app.reducer";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";

import { App } from "./components/App";

const epicMiddleware = createEpicMiddleware(rootEpic);
const store : CityStore = createStore(appReducer, applyMiddleware(epicMiddleware));

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
