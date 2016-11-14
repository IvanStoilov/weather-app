import {Action} from "redux";
import {City, CityData} from "../data/city";
import {Observable} from "rxjs";
import {ActionsObservable, Epic} from "redux-observable";
import {Record} from "immutable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/do";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/fromPromise";

// Declaration

export interface TypedAction<T> {
  type: T;
}

export interface CityAction<T> extends TypedAction<T> {
  city: City;
}

export interface AddCityAction extends CityAction<'ADD_CITY'> {}
export interface DeleteCityAction extends CityAction<'DELETE_CITY'> {}
export interface FetchCityImageAction extends CityAction<'FETCH_CITY_IMAGE'> {}
export interface FetchCityImageActionDone extends CityAction<'FETCH_CITY_IMAGE_DONE'> {}
export interface ReloadCityAction extends CityAction<'RELOAD_CITY_INIT'> {}
export interface ReloadCityDoneAction extends CityAction<'RELOAD_CITY_DONE'> {
  response: { temperature: number };
}
export interface SetCityPropAction extends CityAction<'SET_CITY_PROP'> {
  prop: string;
  value: any;
}

export type CityListAction = 
  AddCityAction|DeleteCityAction|SetCityPropAction|ReloadCityAction|ReloadCityDoneAction|FetchCityImageAction;

// Implementation

export function createCity(data: CityData) : City {
    const cityClass = Record(data);
    return (new cityClass()) as City;
}

export function addCity(cityName: string) : AddCityAction {
  const newId = (Math.random() + '').substr(2);
  
  const city = createCity({
    id: `city-${newId}`,
    name: cityName, 
    isFetching: false,
    weather: null,
    imageUrl: null
  });

  return {
    type: 'ADD_CITY',
    city
  }
}

function cityActionFactory(type : string) {
  return (city: City) => ({
    type, 
    city
  });
}

export const deleteCity = cityActionFactory('DELETE_CITY');
export const reloadCity = cityActionFactory('RELOAD_CITY_INIT');
export const fetchCityImage = cityActionFactory('FETCH_CITY_IMAGE');

export function setCityProp(city: City, prop: string, value: any) : SetCityPropAction {
  return {
    type: 'SET_CITY_PROP',
    city,
    prop,
    value
  }
}

export function reloadCityDone(city: City, response: any) : ReloadCityDoneAction {
  return {
    type: 'RELOAD_CITY_DONE',
    city,
    response
  }
}

export const addCityEpic : Epic<CityListAction> = (action$ : ActionsObservable<CityListAction>) => {
  return action$
    .ofType('ADD_CITY')
    .flatMap(action => [fetchCityImage(action.city), reloadCity(action.city)]);
}

export const fetchCityImageEpic : Epic<CityListAction> = (action$ : ActionsObservable<CityListAction>) => {
  const urlFactory = (name: string) => `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3353ad157aa07bbda0a7a1e6bcec904f&format=json&tags=${name}`;

  return action$
    .ofType('FETCH_CITY_IMAGE')
    .switchMap(action => {
      return Observable.fromPromise(fetch(urlFactory(action.city.name)))
        .map(result => setCityProp(action.city, 'imageUrl', result))
    });
}

export const reloadCityEpic : Epic<CityListAction> = (action$ : ActionsObservable<CityListAction>) => {
  return action$
    .ofType('RELOAD_CITY_INIT')
    .delay(2000)
    .map((action: ReloadCityAction) => reloadCityDone(action.city, {temperature: 12}));
}
