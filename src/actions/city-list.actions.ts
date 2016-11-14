import {Action} from "redux";
import {City} from "../types";
import {Observable} from "rxjs";
import {ActionsObservable, Epic} from "redux-observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/do";

// Declaration

export interface TypedAction<T> {
  type: T;
}

export interface CityAction<T> extends TypedAction<T> {
  city: City;
}

export interface AddCityAction extends TypedAction<'ADD_CITY'> {
    cityName?: string;
}

export interface DeleteCityAction extends CityAction<'DELETE_CITY'> {}
export interface ReloadCityAction extends CityAction<'RELOAD_CITY_INIT'> {}
export interface ReloadCityDoneAction extends CityAction<'RELOAD_CITY_DONE'> {
  response: any;
}

export type CityListAction = AddCityAction|DeleteCityAction|ReloadCityAction|ReloadCityDoneAction;

// Implementation

export function addCity(cityName: string) : AddCityAction {
  return {
    type: 'ADD_CITY',
    cityName
  }
}

export function deleteCity(city: City) : DeleteCityAction {
  return {
    type: 'DELETE_CITY',
    city
  }
}

export function reloadCityDone(city: City, response: any) : ReloadCityDoneAction {
  return {
    type: 'RELOAD_CITY_DONE',
    city,
    response
  }
}

export function reloadCity(city: City) : ReloadCityAction {
  return {
    type: 'RELOAD_CITY_INIT',
    city
  };
}

export const reloadCityEpic : Epic<CityListAction> = (action$ : ActionsObservable<CityListAction>) => {
  return action$
    .ofType('RELOAD_CITY_INIT')
    .delay(2000)
    .map((action: ReloadCityAction) => {
      // var url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3353ad157aa07bbda0a7a1e6bcec904f&format=json&tags=${action.cityName}`;
      const url = 'http://cdn.ek.aero/english/images/London-1_tcm233-2111842.jpg';
      return reloadCityDone(action.city, url);
    });
}
