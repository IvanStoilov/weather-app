import * as Immutable from "immutable";
import * as React from "react";
import {City} from "../data/city";

interface ICityItemProps {
  city: City;
  onDelete: Function;
  onReload: Function;
}

export class CityItem extends React.Component<ICityItemProps, {}> {
  constructor() {
    super();
  }

  render() : JSX.Element {
    return (
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-80">{this.props.city.name}</div>
            <div className="col-20">{this.getIfNecessarySpinner()}</div>
          </div>
        </div>
        <div className="card-content">
          <div className="card-content-inner">
            {this.getImageIfSet()}
            {this.getWeather()}
          </div>
        </div>
        <div className="card-footer">
          <button type="button" className="button" onClick={() => this.props.onDelete()}>Remove</button>
          <button type="button" className="button" onClick={() => this.props.onReload()}>Reload</button>
        </div>
      </div>
    )
  }

  private getImageIfSet() : JSX.Element {
    if (this.props.city.imageUrl) {
      return <img className="small-image" src={this.props.city.imageUrl} />
    }

    return null;
  }

  private getIfNecessarySpinner() : JSX.Element {
    if (this.props.city.isFetching) {
      return <span>Loading...</span>
    }

    return null;
  }

  private getWeather() : JSX.Element {
    if (this.props.city.weather) {
      return ( 
        <div>
          <p>Sunny! Current temperature: {this.props.city.weather.temperature}°</p>
          <p>Last updated: {this.props.city.weather.updatedAt.toString()}</p>
        </div>
      );
    }

    return null;
  }
}
