import {City, CityList, CityListAction} from "../types";
import {List} from "Immutable";
import {Reducer} from "Redux";

const INITIAL_LIST = List<City>([
    {id: 'city-1', name: 'London'}, 
    {id: 'city-2', name: 'Paris'},
]);

const reducer : Reducer<CityList> = (state: CityList = INITIAL_LIST, action: CityListAction): CityList => {
    switch (action.type) {
        case 'ADD_CITY':
            const newId = (Math.random() + '').substr(2);
            return state.push({name: action.cityName, id: `city-${newId}`});
        case 'DELETE_CITY':
            return state.filterNot(city => city.id === action.city.id) as CityList;
        default:
            return state;
    }
};

export default reducer;
