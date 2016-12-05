import {ActionsObservable, Epic} from "redux-observable";
import {CityListActions} from ".";
import {Observable} from "rxjs";

import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/fromPromise";
import {IWeatherApiErrorResponse} from "../../custom-typings/weather-api-error";

export const reloadCityEpic : Epic<CityListActions.CityListAction> = (action$ : ActionsObservable<CityListActions.CityListAction>) => {
    return action$
        .ofType('RELOAD_CITY_INIT')
        .switchMap((action: CityListActions.IReloadCityAction) => {

            const url = `https://api.apixu.com/v1/forecast.json?key=04d1840631404d7ba90153829161511&days=5&q=${action.city.name}`;
            return Observable.fromPromise(fetch(url))
                .delay(1250)
                .switchMap(result => result.json())
                .map((result: any) => {
                    return (!!result.error || result.location.name === '')
                        ? CityListActions.deleteCity(action.city)
                        : CityListActions.reloadCityDone(action.city, result);
                })
        });
}
