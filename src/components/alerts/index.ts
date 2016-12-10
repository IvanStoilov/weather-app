import {Action} from "redux";
import {List} from "immutable";
import {showAlert, popAlert} from "./alerts-actions";
import {hideAlertsEpic} from "./hide-alerts.epic";

export type AlertType = "error"|"success"|"warning";

export class AlertTypes {
    static SUCCESS : AlertType = 'success';
    static ERROR : AlertType = 'error';
    static WARNING : AlertType = 'warning';
}

export interface IAlert {
    message: string;
    type: AlertType;
    duration: number;
}

export interface IAlertAction extends Action {
    alert: IAlert;
}

export interface IAlertList extends List<IAlert> {
}

export interface IAlertsState extends IAlertList {}

export {alertsReducer} from "./alerts.reducer";

export const AlertsActions = {
    showAlert,
    popAlert
};

export {Alerts} from "./alerts.component";

export const alertsEpics = [
    hideAlertsEpic
];
