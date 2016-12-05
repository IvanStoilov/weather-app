import {ActionsObservable, Epic} from "redux-observable";
import {CityListAction, CityListActions} from ".";

import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/do";

export const addCityEpic : Epic<CityListAction> = (action$ : ActionsObservable<CityListAction>) => {
  return action$
      .ofType('ADD_CITY')
      .flatMap(action => [
          // CityListActions.fetchCityImage(action.city),
          CityListActions.reloadCity(action.city)
      ]);
}
