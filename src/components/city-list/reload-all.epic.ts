import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

import {ActionsObservable, Epic} from "redux-observable";
import {ICityListAction, CityListActionTypes} from "./city-list.actions";
import {AppStore} from "../../data/city-store";
import {ICity} from "../../data/city";
import {CityListActions} from "./index";
import {Action} from "redux";

export const reloadAllEpic : Epic<ICityListAction> = (action$ : ActionsObservable<ICityListAction>, store : AppStore) => {
    return action$
        .ofType(CityListActionTypes.RELOAD_ALL)
        .flatMap((action : Action) => store.getState().cities.toJS())
        .map((city : ICity) => CityListActions.reloadCity(city));
}
