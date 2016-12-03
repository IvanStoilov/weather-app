import "./polyfills";
import "./stylesheets/main.scss";
import "./stylesheets/framework7.less";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { AppStore } from "./data/city-store";
import { Provider } from "react-redux";
import appReducer from "./reducers/app.reducer";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";
import { App } from "./components/App";
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {CityList} from "./components/CityList";
import {AddCity} from "./components/AddCity";
import {CityCache} from "./data/city-cache";

const epicMiddleware = createEpicMiddleware(rootEpic);
const reducers = combineReducers({
    cities: appReducer
});
const initialState = {
    cities: CityCache.getAllCities()
};

const store : AppStore = createStore(reducers, initialState, applyMiddleware(epicMiddleware)) as AppStore;

store.subscribe(() => CityCache.setCities(store.getState().cities));

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory}>
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
