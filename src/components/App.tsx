import * as React from "react";
import * as Immutable from "Immutable";
import {Store} from "Redux";
import {AddCity} from "./AddCity";
import {CityList} from "./CityList";
import {CityStore, WeatherAppComponent, City} from "../types";

export class App extends WeatherAppComponent<{}, {}> {
    private store : CityStore = this.context.store;

    render() : JSX.Element {
        return (
            <div>
                <AddCity 
                    onAdd={this.addCity.bind(this)} />
                <CityList 
                    cities={this.store.getState()}
                    onDelete={this.onDeleteCity.bind(this)} />
            </div>
        );
    }

    private addCity(cityName : string) {
        this.context.store.dispatch({type: 'ADD_CITY', cityName});
    }

    private onDeleteCity(city: City) {
        this.context.store.dispatch({type: 'DELETE_CITY', city});
    }
}

App.contextTypes = {
    store: React.PropTypes.object
}
