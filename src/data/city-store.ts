import {Store} from "redux";
import {CityList} from "./city-list";
import {IAddCityState} from "../components/add-city";
import {IAlertsState} from "../components/alerts";

export interface AppStoreState {
    cities: CityList;
    addCity: IAddCityState;
    alerts: IAlertsState;
}

export interface AppStore extends Store<AppStoreState> {
    cities: CityList
}
