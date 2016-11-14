import './polyfills';

import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { City } from "./data/city";
import { CityStore } from "./data/city-store";
import { List } from "immutable";
import { Provider } from "react-redux";
import appReducer from "./reducers/app.reducer";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { reloadCityEpic, addCityEpic, fetchCityImageEpic } from "./actions/city-list.actions";

import { App } from "./components/App";

const epicMiddleware = createEpicMiddleware(combineEpics(reloadCityEpic, addCityEpic, fetchCityImageEpic));
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
