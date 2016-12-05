import {ActionsObservable, Epic} from "redux-observable";
import {CityListAction, ReloadCityAction, reloadCityDone, deleteCity} from "../../actions/city-list.actions.ts";
import {Observable} from "rxjs";
import {Forecast} from "../../custom-typings/forecast";

import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/fromPromise";

export const reloadCityEpic : Epic<CityListAction> = (action$ : ActionsObservable<CityListAction>) => {
    return action$
        .ofType('RELOAD_CITY_INIT')
        .switchMap((action: ReloadCityAction) => {

            const url = `https://api.apixu.com/v1/forecast.json?key=04d1840631404d7ba90153829161511&days=5&q=${action.city.name}`;
            return Observable.fromPromise(fetch(url))
                .delay(1250)
                .switchMap(result => result.json())
                .map((result: Forecast) => {
                    return (result['error'])
                        ? deleteCity(action.city)
                        : reloadCityDone(action.city, result);
                })
        });
}
