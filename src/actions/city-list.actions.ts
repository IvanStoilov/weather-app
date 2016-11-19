import {ICity, City} from "../data/city";

// Declaration

export interface TypedAction<T> {
  type: T;
}

export interface CityAction<T> extends TypedAction<T> {
  city: ICity;
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

export function addCity(cityName: string) : AddCityAction {
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

export function setCityProp(city: ICity, prop: string, value: any) : SetCityPropAction {
  return {
    type: 'SET_CITY_PROP',
    city,
    prop,
    value
  }
}

export function reloadCityDone(city: ICity, response: any) : ReloadCityDoneAction {
  return {
    type: 'RELOAD_CITY_DONE',
    city,
    response
  }
}
