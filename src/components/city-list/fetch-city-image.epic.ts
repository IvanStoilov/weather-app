import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/fromPromise";

import {ActionsObservable, Epic} from "redux-observable";
import {CityListActions} from ".";
import {Observable} from "rxjs";
import {ICityListAction, CityListActionTypes} from "./city-list.actions";

export const fetchCityImageEpic : Epic<ICityListAction> = (action$ : ActionsObservable<ICityListAction>) => {
  const urlFactory = (name: string) => `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3353ad157aa07bbda0a7a1e6bcec904f&format=json&tags=${name}`;

  return action$
    .ofType(CityListActionTypes.FETCH_CITY_IMAGE)
    .switchMap(action => {
      return Observable.fromPromise(fetch(urlFactory(action.city.name)))
        .map(result => CityListActions.setCityProp(action.city, 'imageUrl', result))
    });
}
