import {Store} from "redux";
import {CityList} from "./city-list";

export interface AppStore extends Store<{cities: CityList}> {
    cities: CityList
}
