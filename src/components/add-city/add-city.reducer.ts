import {Reducer} from "redux";
import {AddCityActionTypes, IAddCityAction} from "./add-city.actions";

export interface IAddCityState {
    cityName: string;
}

const INITIAL = {
    cityName: ''
};

export const addCityReducer : Reducer<IAddCityState> = (state: IAddCityState = INITIAL, action: IAddCityAction): IAddCityState => {
    switch (action.type) {
        case AddCityActionTypes.CHANGE_NAME:
            return { cityName: action.cityName };

        default:
            return state;
    }
};
