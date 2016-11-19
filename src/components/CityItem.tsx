import * as React from "react";
import {ICity} from "../data/city";
import {Forecast, Forecastday} from "../custom-typings/forecast";
import * as moment from "moment";

interface ICityItemProps {
  city: ICity;
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
            <div className="col-33">
              {this.getName()} <br/>
            </div>
            <div className="col-33">
              {this.getIfNecessarySpinner()}
            </div>
            <div className="col-33">
              <img className="condition-icon" src={this.getForecast().current.condition.icon} />
            </div>
        </div>
        <div className="card-content">
          <div className="card-content-inner">
            { /* this.getImageIfSet() */ }
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
      return <span> Loading...</span>
    }

    return null;
  }

  private getWeather() : JSX.Element {
    if (this.getForecast()) {
      return (
        <div className="row">
          {this.getForecastDays(this.getForecast().forecast.forecastday)}
          { /* <p>
            {this.getForecast().current.condition.text}, {this.getForecast().current.temp_c}°</p>
          <p>Last updated: {moment(this.props.city.weather.updatedAt).fromNow()}</p>
          */ }
        </div>
      );
    }

    return null;
  }

  private getForecastDays(forecastDays: Forecastday[]) : JSX.Element {
    return forecastDays.map(day => this.getForecastDay(day));
  }

  private getForecastDay(forecastDay: Forecastday) : JSX.Element {
     return (
         <div className="forecast-day col-20">
           {moment(forecastDay.date).format('MMM D')}
           <img src={forecastDay.day.condition.icon} alt=""/>
           {Math.round(forecastDay.day.mintemp_c)}° / {Math.round(forecastDay.day.maxtemp_c)}°
         </div>
     );
  }

  private getName() : string {
    if (this.getForecast()) {
      return `${this.getForecast().location.name}, ${this.getForecast().location.country}`;
    }

    return this.props.city.name;
  }

  private getForecast() : Forecast {
    return this.props.city.weather && this.props.city.weather.forecast;
  }
}
