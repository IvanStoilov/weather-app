import {Reducer, Action, Store} from "redux";
import {Component} from "React";
import * as React from "React";
import {List, Map} from "Immutable";

export interface CityData {
  id: string;
  name: string;
  isFetching: boolean;
  imageUrl?: string;
}

export interface City extends CityData, Map<string, any> {
};

export interface CityList extends List<City> {
}

export interface CityStore extends Store<CityList> {
}

export class WeatherAppComponent<P, S> extends Component<P, S> {
    context: {store: CityStore};
    static contextTypes: any;
}
