import {ActionsObservable, Epic} from "redux-observable";
import {CityListAction, reloadCity} from "../actions/city-list.actions";
import {CityCache} from "../data/city-cache";

import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/do";

export const addCityEpic : Epic<CityListAction> = (action$ : ActionsObservable<CityListAction>) => {
    return action$
        .ofType('ADD_CITY')
        .flatMap(action => [
            //fetchCityImage(action.city),
            reloadCity(action.city)
        ]);
}
