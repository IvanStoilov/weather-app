import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/do";

import {ActionsObservable, Epic} from "redux-observable";
import {CityListActions} from "../city-list";
import {CityListAction} from "../city-list/city-list.actions.ts";

export const addCityEpic : Epic<CityListAction> = (action$ : ActionsObservable<CityListAction>) => {
  return action$
      .ofType('ADD_CITY')
      .flatMap(action => [
          // CityListActions.fetchCityImage(action.city),
          CityListActions.reloadCity(action.city)
      ]);
}
