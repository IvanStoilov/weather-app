import {ITypedAction} from "../city-list/city-list.actions.ts";

export class AddCityActionTypes {
    static CHANGE_NAME: string = 'add-city/CHANGE_NAME';
}

export interface IAddCityAction extends ITypedAction<string> {
    cityName: string;
}

export const changeCityName = (cityName: string) : IAddCityAction => ({
    type: AddCityActionTypes.CHANGE_NAME,
    cityName
});
