import {ActionsObservable, Epic} from "redux-observable";
import {CityListAction, reloadCity} from "../actions/city-list.actions";

import "rxjs/add/operator/mergeMap";

export const addCityEpic : Epic<CityListAction> = (action$ : ActionsObservable<CityListAction>) => {
  return action$
    .ofType('ADD_CITY')
    .flatMap(action => [
      //fetchCityImage(action.city), 
      reloadCity(action.city)
    ]);
}
