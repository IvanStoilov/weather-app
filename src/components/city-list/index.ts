import {fetchCityImageEpic} from './fetch-city-image.epic.ts';
import {reloadCityEpic} from './reload-city.epic.ts';
import * as Actions from "./city-list.actions";

export {CityList} from './city-list.component';

export const cityListEpics = [
    fetchCityImageEpic,
    reloadCityEpic
];

export const CityListActions = {
    addCity: Actions.addCity,
    reloadCity: Actions.reloadCity,
    deleteCity: Actions.deleteCity,
    setCityProp: Actions.setCityProp,
    fetchCityImage: Actions.fetchCityImage
};
