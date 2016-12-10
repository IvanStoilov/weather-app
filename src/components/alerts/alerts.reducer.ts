import {IAlert, IAlertAction, IAlertList} from ".";
import {List} from "immutable";
import {Reducer} from "redux";
import {AlertActionTypes} from "./alerts-actions";

const INITIAL_LIST = List<IAlert>();

export const alertsReducer : Reducer<IAlertList> = (state: IAlertList = INITIAL_LIST, action: IAlertAction): IAlertList => {
    switch (action.type) {
        case AlertActionTypes.ADD:
            return state.push(action.alert);

        case AlertActionTypes.POP:
            return state.filterNot(alert => alert === action.alert) as IAlertList;

        default:
            return state;
    }
};
