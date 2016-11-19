import {ICity, CityData} from "../data/city";
import {CityList} from "../data/city-list";
import {CityListAction} from "../actions/city-list.actions"
import {List, Record} from "immutable";
import {Reducer} from "redux";

const INITIAL_LIST = List<ICity>();

const reducer : Reducer<CityList> = (state: CityList = INITIAL_LIST, action: CityListAction): CityList => {
    console.log(action)
    switch (action.type) {
        case 'ADD_CITY':
            return state.push(action.city);

        case 'DELETE_CITY':
            return state.filterNot(city => city.id === action.city.id) as CityList;

        case 'SET_CITY_PROP': 
            return state.map((city: ICity) => {
                if (city.id === action.city.id) {
                    return city.set(action.prop, action.value);
                }

                return city;
            }) as CityList;

        case 'RELOAD_CITY_INIT': 
            return state.map((city: ICity) => {
                if (city.id === action.city.id) {
                    return city.set('isFetching', true);
                }

                return city;
            }) as CityList;
            
        case 'RELOAD_CITY_DONE': 
            return state.map((city: ICity) => {
                if (city.id === action.city.id) {
                    return city
                        .set('isFetching', false)
                        .set('weather', {
                            forecast: action.response,
                            updatedAt: new Date().toISOString()
                        });
                }

                return city;
            }) as CityList;

        default:
            return state;
    }
};

export default reducer;
