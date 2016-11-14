import * as React from "react";
import * as Immutable from "immutable";
import * as CityListActions from "../actions/city-list.actions";

import {Store} from "redux";
import {AddCity} from "./AddCity";
import {CityList} from "./CityList";
import {City} from "../data/city";
import {CityStore} from "../data/city-store";
import {CityStoreComponent} from "../types";

export class App extends CityStoreComponent<{}, {}> {
    private store : CityStore = this.context.store;

    render() : JSX.Element {
        return (
            <div>
                <AddCity 
                    onAdd={this.addCity.bind(this)} />
                <CityList 
                    cities={this.store.getState()}
                    onDelete={this.onDeleteCity.bind(this)}
                    onReload={this.onReload.bind(this)} />
            </div>
        );
    }

    private addCity(cityName : string) {
        this.context.store.dispatch(CityListActions.addCity(cityName));
    }

    private onDeleteCity(city: City) {
        this.context.store.dispatch(CityListActions.deleteCity(city));
    }

    private onReload(city: City) {
        this.context.store.dispatch(CityListActions.reloadCity(city));
    }
}

App.contextTypes = {
    store: React.PropTypes.object
}
