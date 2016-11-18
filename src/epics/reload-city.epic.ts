import {ActionsObservable, Epic} from "redux-observable";
import {CityListAction, ReloadCityAction, reloadCityDone} from "../actions/city-list.actions";
import {Observable} from "rxjs";
import {Forecast} from "../custom-typings/forecast";

import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/fromPromise";

export const reloadCityEpic : Epic<CityListAction> = (action$ : ActionsObservable<CityListAction>) => {
  return action$
    .ofType('RELOAD_CITY_INIT')
    .switchMap((action: ReloadCityAction) => {
      const url = `http://127.0.0.1:8000/forecast.json?city=${action.city.name}`;

      return Observable.fromPromise(fetch(url))
        .switchMap(result => result.json()) 
        .map((result: Forecast) => {
          console.log(result);
          return reloadCityDone(action.city, {temperature: result.current.temp_c})
        })
    });
}
