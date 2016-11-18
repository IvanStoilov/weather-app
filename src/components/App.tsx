import * as React from "react";
import * as Immutable from "immutable";
import * as CityListActions from "../actions/city-list.actions";

import {Store} from "redux";
import {AddCity} from "./AddCity";
import {CityList} from "./CityList";
import {City} from "../data/city";
import {CityStore} from "../data/city-store";
import {CityStoreComponent} from "../types";
import {Link} from "react-router";

export class App extends CityStoreComponent<{}, {}> {
    private store : CityStore = this.context.store;

    render() : JSX.Element {
        return (
            <div>
                <h1>The Weather App</h1>
                <ul>
                    <li><Link to="/">Cities list</Link></li>
                    <li><Link to="/add">Add city</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

App.contextTypes = {
    store: React.PropTypes.object
}
