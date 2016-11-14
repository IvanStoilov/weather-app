import 'es6-promise';

import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { City, CityStore } from "./types";
import { List } from "Immutable";
import { Provider } from "react-redux";
import appReducer from "./reducers/app.reducer";
import { createEpicMiddleware } from "redux-observable";
import { reloadCityEpic } from "./actions/city-list.actions";

import { App } from "./components/App";

const epicMiddleware = createEpicMiddleware(reloadCityEpic);
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
