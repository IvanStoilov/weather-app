import {fetchCityImageEpic} from './fetch-city-image.epic.ts';
import {reloadCityEpic} from './reload-city.epic.ts';
import * as Actions from "./city-list.actions";
import {persistCityListEpic} from "./persist-city-list.epic";

export {CityList} from './city-list.component';

export const cityListEpics = [
    fetchCityImageEpic,
    reloadCityEpic,
    persistCityListEpic
];

export const CityListActions = {
    addCity: Actions.addCity,
    reloadCity: Actions.reloadCity,
    deleteCity: Actions.deleteCity,
    setCityProp: Actions.setCityProp,
    fetchCityImage: Actions.fetchCityImage,
    persistCityList: Actions.persistCityList
};
