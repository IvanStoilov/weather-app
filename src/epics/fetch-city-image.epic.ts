import {ActionsObservable, Epic} from "redux-observable";
import {CityListAction, setCityProp} from "../actions/city-list.actions";
import {Observable} from "rxjs";

import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/fromPromise";

export const fetchCityImageEpic : Epic<CityListAction> = (action$ : ActionsObservable<CityListAction>) => {
  const urlFactory = (name: string) => `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3353ad157aa07bbda0a7a1e6bcec904f&format=json&tags=${name}`;

  return action$
    .ofType('FETCH_CITY_IMAGE')
    .switchMap(action => {
      return Observable.fromPromise(fetch(urlFactory(action.city.name)))
        .map(result => setCityProp(action.city, 'imageUrl', result))
    });
}
