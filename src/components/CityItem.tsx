import * as Immutable from "Immutable";
import * as React from "react";
import {City} from "../types";

interface ICityItemProps {
  city: City;
  onDelete: Function;
}

export class CityItem extends React.Component<ICityItemProps, {}> {
  constructor() {
    super();
  }

  render() : JSX.Element {
    return (
      <div>
        (id={this.props.city.id}) {this.props.city.name} <button type="button" onClick={() => this.props.onDelete()}>Remove</button>
      </div>
    )
  }
}
