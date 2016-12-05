import {ICity, City} from "../../data/city";
import {IForecast} from "../../custom-typings/forecast";

// Declaration

export interface ITypedAction<T> {
  type: T;
}

export interface ICityAction<T> extends ITypedAction<T> {
  city: ICity;
}

export interface IAddCityAction extends ICityAction<'ADD_CITY'> {}
export interface IDeleteCityAction extends ICityAction<'DELETE_CITY'> {}
export interface IFetchCityImageAction extends ICityAction<'FETCH_CITY_IMAGE'> {}
export interface IFetchCityImageActionDone extends ICityAction<'FETCH_CITY_IMAGE_DONE'> {}
export interface IReloadCityAction extends ICityAction<'RELOAD_CITY_INIT'> {}
export interface IReloadCityDoneAction extends ICityAction<'RELOAD_CITY_DONE'> {
  response: IForecast;
}
export interface ISetCityPropAction extends ICityAction<'SET_CITY_PROP'> {
  prop: string;
  value: any;
}

export type CityListAction = 
  IAddCityAction|IDeleteCityAction|ISetCityPropAction|IReloadCityAction|IReloadCityDoneAction|IFetchCityImageAction;

// Implementation

export function addCity(cityName: string) : IAddCityAction {
  const newId = (Math.random() + '').substr(2);
  
  const city = City.create({
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
  return (city: ICity) => ({
    type, 
    city
  });
}

export const deleteCity = cityActionFactory('DELETE_CITY');
export const reloadCity = cityActionFactory('RELOAD_CITY_INIT');
export const fetchCityImage = cityActionFactory('FETCH_CITY_IMAGE');

export function setCityProp(city: ICity, prop: string, value: any) : ISetCityPropAction {
  return {
    type: 'SET_CITY_PROP',
    city,
    prop,
    value
  }
}

export function reloadCityDone(city: ICity, response: IForecast) : IReloadCityDoneAction {
  return {
    type: 'RELOAD_CITY_DONE',
    city,
    response
  }
}
