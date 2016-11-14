import * as Immutable from "Immutable";
import * as React from "react";
import * as Redux from "Redux";
import {CityItem} from "./CityItem";
import {City, CityList as CityListType} from "../types";

interface ICityListProps {
  cities: CityListType;
  onDelete?: (city: City) => any;
  onReload?: (city: City) => any;
}

export class CityList extends React.Component<ICityListProps, {}> {
  constructor() {
    super();
  }

  render() : JSX.Element {
    const cities = this.props.cities.map(city => 
      <CityItem 
        key={city.id} 
        city={city}
        onDelete={() => this.props.onDelete(city)} 
        onReload={() => this.props.onReload(city)}/>
    ).toJS();

    return (
      <div>
        {cities}
      </div>
    )
  }
}
