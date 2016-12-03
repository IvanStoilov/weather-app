import "./polyfills";
import "./stylesheets/main.scss";
import "./stylesheets/framework7.less";

import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {AppStore} from "./data/city-store";
import {Provider} from "react-redux";
import {cityListReducer} from "./components/city-list/city-list.reducer";
import {AddCity, addCityReducer} from "./components/add-city";
import {createEpicMiddleware} from "redux-observable";
import {cityListEpics} from "./components/city-list";
import {App} from "./components/app.component";
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {CityList} from "./components/city-list/city-list.component";
import {CityCache} from "./data/city-cache";

const epicMiddleware = createEpicMiddleware(cityListEpics);

const reducers = combineReducers({
    cities: cityListReducer,
    addCity: addCityReducer
});
const initialState = {
    cities: CityCache.getAllCities()
};

const store : AppStore = createStore(reducers, initialState, applyMiddleware(epicMiddleware)) as AppStore;

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
