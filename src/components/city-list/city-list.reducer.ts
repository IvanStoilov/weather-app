import {ICity, CityData} from "../../data/city";
import {CityList} from "../../data/city-list";
import {ICityListAction, CityListActionTypes} from "./city-list.actions.ts"
import {List, Record} from "immutable";
import {Reducer} from "redux";

const INITIAL_LIST = List<ICity>();

export const cityListReducer : Reducer<CityList> = (state: CityList = INITIAL_LIST, action: ICityListAction): CityList => {
    switch (action.type) {
        case CityListActionTypes.ADD_CITY:
            return state.push(action.city);

        case CityListActionTypes.DELETE_CITY:
            return state.filterNot(city => city.id === action.city.id) as CityList;

        case CityListActionTypes.SET_CITY_PROP:
            return state.map((city: ICity) => {
                if (city.id === action.city.id) {
                    return city.set(action.prop, action.value);
                }

                return city;
            }) as CityList;
        default:
            return state;
    }
};

