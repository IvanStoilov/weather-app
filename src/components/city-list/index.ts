import {combineEpics} from 'redux-observable';
import {addCityEpic} from './add-city.epic.ts';
import {fetchCityImageEpic} from './fetch-city-image.epic.ts';
import {reloadCityEpic} from './reload-city.epic.ts';

export {CityList} from './city-list.component';

export const cityListEpics = combineEpics(
    addCityEpic,
    fetchCityImageEpic,
    reloadCityEpic
);
