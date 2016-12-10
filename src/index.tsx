import "./polyfills";
import "./stylesheets/main.scss";
import "./stylesheets/framework7.less";

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import {createEpicMiddleware, combineEpics} from "redux-observable";
import {AppStore} from "./data/city-store";
import {cityListReducer} from "./components/city-list/city-list.reducer";
import {alertsReducer, alertsEpics} from "./components/alerts";
import {AddCity, addCityReducer, addCityEpics} from "./components/add-city";
import {cityListEpics} from "./components/city-list";
import {App} from "./components/app.component";
import {CityList} from "./components/city-list/city-list.component";
import {CityCache} from "./data/city-cache";
import middleware from "./middleware";

const epicMiddleware = createEpicMiddleware(combineEpics(...[
    ...middleware,
    ...cityListEpics,
    ...addCityEpics,
    ...alertsEpics
]));

const reducers = combineReducers({
    cities: cityListReducer,
    addCity: addCityReducer,
    alerts: alertsReducer
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
