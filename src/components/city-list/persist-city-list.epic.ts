import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";
import "rxjs/add/observable/empty";

import {Epic, ActionsObservable} from "redux-observable";
import {Action} from "redux";
import {Observable} from "rxjs/Observable";
import {AppStore} from "../../data/city-store";
import {CityCache} from "../../data/city-cache";

export const persistCityListEpic : Epic<Action> = (action$ : ActionsObservable<Action>, store : AppStore) => {
    return action$
        .ofType('PERSIST_CITY_LIST', 'DELETE_CITY')
        .do((action : Action) => {
            CityCache.setCities(store.getState().cities);
        })
        .switchMap(action => Observable.empty());
}
