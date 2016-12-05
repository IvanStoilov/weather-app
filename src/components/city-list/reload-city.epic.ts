import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/concat";
import "rxjs/add/observable/of";

import {CityListActions} from ".";
import {ActionsObservable, Epic} from "redux-observable";
import {IForecast} from "../../custom-typings/forecast";
import {CityListAction} from "./city-list.actions";
import {Observable} from "rxjs";

export const reloadCityEpic : Epic<CityListAction> = (action$ : ActionsObservable<CityListAction>) => {
    return action$
        .ofType('RELOAD_CITY_INIT')
        .switchMap((action: CityListAction) => {
            return Observable.concat(
                Observable.of(CityListActions.setCityProp(action.city, 'isFetching', true)),
                fetchForecast(action.city.name)
                    .switchMap((result : any) => unPackApiCallResponse(result, action))
                    .flatMap((forecast: IForecast) => updateCityForecast(forecast, action))
            )
                .catch(error => Observable.of(CityListActions.deleteCity(action.city)));
        })

    function fetchForecast(cityName: string) : Observable<any> {
        const url = `https://api.apixu.com/v1/forecast.json?key=04d1840631404d7ba90153829161511&days=5&q=${cityName}`;

        return Observable.fromPromise(fetch(url));
    }

    function unPackApiCallResponse(result : any, action : CityListAction) : Observable<IForecast> {
        const resultObj = result.json();

        if (!!result.error || result.location.name === '') {
            return Observable.throw(`No info for '${action.city.name}' found.`)
        }

        return resultObj;
    }

    function updateCityForecast(forecast : IForecast, action : CityListAction) : CityListAction[] {
        return [
            CityListActions.setCityProp(action.city, 'isFetching', false),
            CityListActions.setCityProp(action.city, 'weather', {
                forecast: forecast,
                updatedAt: new Date().toISOString()
            })
        ];
    }
}
