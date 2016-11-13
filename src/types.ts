import {Reducer, Action, Store} from "redux";
import {Component} from "React";
import * as React from "React";
import {List} from "Immutable";

export interface City {
  id: string;
  name: string;
};

export interface CityList extends List<City> {
}

export interface CityListAction extends Action {
    type: 'ADD_CITY'|'DELETE_CITY';
    cityName?: string;
    city?: City;
}

export interface CityStore extends Store<CityList> {
}

export class WeatherAppComponent<P, S> extends Component<P, S> {
    context: {store: CityStore};
    static contextTypes: any;
}
