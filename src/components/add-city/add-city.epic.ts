import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/do";

import {ActionsObservable, Epic} from "redux-observable";
import {CityListActions} from "../city-list";
import {CityListActionTypes, ICityListAction} from "../city-list/city-list.actions.ts";

export const addCityEpic : Epic<ICityListAction> = (action$ : ActionsObservable<ICityListAction>) => {
  return action$
      .ofType(CityListActionTypes.ADD_CITY)
      .flatMap(action => [
          // CityListActions.fetchCityImage(action.city),
          CityListActions.reloadCity(action.city)
      ]);
}
