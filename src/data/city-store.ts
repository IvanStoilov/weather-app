import {Store} from "redux";
import {CityList} from "./city-list";
import {IAddCityState} from "../components/add-city";

export interface AppStoreState {
    cities: CityList;
    addCity: IAddCityState
}

export interface AppStore extends Store<AppStoreState> {
    cities: CityList
}
