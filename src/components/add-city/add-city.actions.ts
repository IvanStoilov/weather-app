import {TypedAction} from "../../actions/city-list.actions";

export class AddCityActionTypes {
    static CHANGE_NAME: string = 'add-city/CHANGE_NAME';
}

export interface IAddCityAction extends TypedAction<string> {
    cityName: string;
}

export const changeCityName = (cityName: string) : IAddCityAction => ({
    type: AddCityActionTypes.CHANGE_NAME,
    cityName
});
