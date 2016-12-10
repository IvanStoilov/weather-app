import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/delay";
import "rxjs/add/observable/of";

import {IAlertAction, AlertsActions} from ".";
import {ActionsObservable, Epic} from "redux-observable";
import {AlertActionTypes} from "./alerts-actions";
import {Observable} from "rxjs/Observable";

export const hideAlertsEpic : Epic<IAlertAction> = (action$ : ActionsObservable<IAlertAction>) => {
    return action$
        .ofType(AlertActionTypes.ADD)
        .flatMap((action: IAlertAction) => {
            return Observable.of(AlertsActions.popAlert(action.alert))
                .delay(action.alert.duration)
        });
}
