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
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router';
import {CityList} from "./components/CityList";
import {AddCity} from "./components/AddCity";

const epicMiddleware = createEpicMiddleware(rootEpic);
const store : CityStore = createStore(appReducer, applyMiddleware(epicMiddleware));

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={CityList} />
                    <Route path="add" component={AddCity} />
                </Route>
            </Router>
        </Provider>,
        document.getElementById("root")
    );
}

render();
