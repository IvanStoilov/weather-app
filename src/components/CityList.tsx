import * as Immutable from "immutable";
import * as React from "react";
import * as Redux from "redux";
import {CityItem} from "./CityItem";
import {CityList as CityListType} from "../data/city-list";
import {City} from "../data/city";
import {CityStore} from "../data/city-store";
import {deleteCity, reloadCity} from "../actions/city-list.actions";
import {CityStoreComponent} from "../types";

export class CityList extends CityStoreComponent<{}, {}> {
  private store : CityStore;

  componentWillMount() {
    this.store = this.context.store;
  }

  constructor() {
    super();
  }

  render() : JSX.Element {
    const cities = this.store.getState().map(city => 
      <CityItem 
        key={city.id} 
        city={city}
        onDelete={this.onDeleteCity.bind(this, city)} 
        onReload={this.onReload.bind(this, city)}/>
    ).toJS();

    return (
      <div>
        {cities}
      </div>
    )
  }

  private onDeleteCity(city: City) {
      this.context.store.dispatch(deleteCity(city));
  }

  private onReload(city: City) {
      this.context.store.dispatch(reloadCity(city));
  }
}

CityList.contextTypes = {
    store: React.PropTypes.object
}
