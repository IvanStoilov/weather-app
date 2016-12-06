import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/concat";
import "rxjs/add/observable/of";

import {CityListActions} from ".";
import {ActionsObservable, Epic} from "redux-observable";
import {IForecast} from "../../custom-typings/forecast";
import {ICityListAction, CityListActionTypes} from "./city-list.actions";
import {Observable} from "rxjs";
import {Action} from "redux";

export const reloadCityEpic : Epic<ICityListAction> = (action$ : ActionsObservable<ICityListAction>) => {
    return action$
        .ofType(CityListActionTypes.RELOAD_CITY)
        .flatMap((action: ICityListAction) => {
            return Observable.concat(
                Observable.of(CityListActions.setCityProp(action.city, 'isFetching', true)),
                fetchForecast(action.city.name)
                    .flatMap((result : any) => unPackApiCallResponse(result, action))
                    .flatMap((forecast: IForecast) => updateCityForecast(forecast, action))
                    .catch(error => Observable.of(CityListActions.deleteCity(action.city)))
            )
        })

    function fetchForecast(cityName: string) : Observable<any> {
        const url = `https://api.apixu.com/v1/forecast.json?key=04d1840631404d7ba90153829161511&days=5&q=${cityName}`;

        return Observable.fromPromise(fetch(url))
            .map(result => {
                if (result.status !== 200) {
                    return Observable.throw(`Couldn't reach the weather station`)
                }

                return result;
            });
    }

    function unPackApiCallResponse(result : any, action : ICityListAction) : Observable<IForecast> {
        return Observable
            .fromPromise(result.json())
            .map((resultObj : any) => {
                console.log(resultObj);

                if (!!resultObj.error || resultObj.location.name === '') {
                    return Observable.throw(`No info found for '${action.city.name}'`)
                }

                return resultObj;
            });
    }

    function updateCityForecast(forecast : IForecast, action : ICityListAction) : Action[] {
        return [
            CityListActions.setCityProp(action.city, 'isFetching', false),
            CityListActions.setCityProp(action.city, 'weather', {
                forecast: forecast,
                updatedAt: new Date().toISOString()
            }),
            CityListActions.persistCityList()
        ];
    }
}
