import * as React from "react";
import {ICity} from "../../data/city";
import {IForecast, IForecastDay} from "../../custom-typings/forecast";
import {Spinner} from "../spinner/spinner.component";
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
                    <div>
                        {this.getName()} <br/>
                    </div>
                    <div>
                        {this.props.city.isFetching ? <Spinner /> : null}
                    </div>
                    <div>
                        {this.getCurrentTemperature()}
                    </div>
                    <div className="condition">
                        {this.getCurrentConditionIcon()}
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

    private getForecastDays(forecastDays: IForecastDay[]) : JSX.Element[] {
        return forecastDays.map(day => this.getForecastDay(day));
    }

    private getForecastDay(forecastDay: IForecastDay) : JSX.Element {
        return (
            <div key={forecastDay.date} className="forecast-day col-20">
                {moment(forecastDay.date).format('MMM D')}
                <img src={forecastDay.day.condition.icon} className="condition-icon" alt=""/>
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

    private getCurrentConditionIcon() : JSX.Element {
        return this.getForecast() ? <img src={this.getForecast().current.condition.icon} /> : null;
    }

    private getCurrentTemperature() : string {
        return this.getForecast() ? `${Math.round(this.getForecast().current.temp_c)} °` : null;
    }

    private getForecast() : IForecast {
        return this.props.city.weather && this.props.city.weather.forecast;
    }
}
