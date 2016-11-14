import {City, CityList, CityData} from "../types";
import {CityListAction} from "../actions/city-list.actions"
import {List, Record} from "Immutable";
import {Reducer} from "Redux";

const INITIAL_LIST = List<City>();

export function createCity(data: CityData) : City {
    const cityClass = Record(data);
    return (new cityClass()) as City;
}

const reducer : Reducer<CityList> = (state: CityList = INITIAL_LIST, action: CityListAction): CityList => {
    console.log(action)
    switch (action.type) {
        case 'ADD_CITY':
            const newId = (Math.random() + '').substr(2);

            return state.push(createCity({
                name: action.cityName, 
                id: `city-${newId}`,
                isFetching: false,
                imageUrl: null
            }));

        case 'DELETE_CITY':
            return state.filterNot(city => city.id === action.city.id) as CityList;

        case 'RELOAD_CITY_INIT': 
            return state.map((city: City) => {
                if (city.id === action.city.id) {
                    return city.set('isFetching', true);
                }

                return city;
            }) as CityList;
            
        case 'RELOAD_CITY_DONE': 
            return state.map((city: City) => {
                if (city.id === action.city.id) {
                    return city
                        .set('isFetching', false)
                        .set('imageUrl', action.response);
                }

                return city;
            }) as CityList;

        default:
            return state;
    }
};

export default reducer;
