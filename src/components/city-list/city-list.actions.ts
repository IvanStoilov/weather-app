import {ICity, City} from "../../data/city";
import {Action} from "redux";

// Declaration

export interface ICityListAction extends Action {
  city: ICity;
  prop?: string;
  value?: any;

}

// Implementation

export const CityListActionTypes = {
  ADD_CITY: 'ADD_CITY',
  DELETE_CITY: 'DELETE_CITY',
  FETCH_CITY_IMAGE: 'FETCH_CITY_IMAGE',
  RELOAD_CITY: 'RELOAD_CITY',
  SET_CITY_PROP: 'SET_CITY_PROP',
  PERSIST_CITY_LIST: 'PERSIST_CITY_LIST',
  RELOAD_ALL: 'RELOAD_ALL',
};

function cityActionFactory(type : string) {
  return (city: ICity) => ({
    type,
    city
  });
}

export const deleteCity = cityActionFactory(CityListActionTypes.DELETE_CITY);
export const reloadCity = cityActionFactory(CityListActionTypes.RELOAD_CITY);
export const fetchCityImage = cityActionFactory(CityListActionTypes.FETCH_CITY_IMAGE);

export function addCity(cityName: string) : ICityListAction {
  const newId = (Math.random() + '').substr(2);

  const city = City.create({
    id: `city-${newId}`,
    name: cityName,
    isFetching: false,
    weather: null,
    imageUrl: null
  });

  return {
    type: CityListActionTypes.ADD_CITY,
    city
  }
}

export function setCityProp(city: ICity, prop: string, value: any) : ICityListAction {
  return {
    type: CityListActionTypes.SET_CITY_PROP,
    city,
    prop,
    value
  }
}

export function persistCityList() : Action {
  return {
    type: CityListActionTypes.PERSIST_CITY_LIST,
  }
}

export function reloadAll() : Action {
  return {
    type: CityListActionTypes.RELOAD_ALL
  }
}
