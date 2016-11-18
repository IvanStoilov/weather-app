import {combineEpics} from 'redux-observable';
import {addCityEpic} from './add-city.epic';
import {fetchCityImageEpic} from './fetch-city-image.epic';
import {reloadCityEpic} from './reload-city.epic';

export const rootEpic = combineEpics(
    reloadCityEpic, 
    addCityEpic, 
    fetchCityImageEpic
);
