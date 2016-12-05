import "rxjs/add/operator/do";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/empty";

import {Action} from "redux";
import {ActionsObservable, Epic} from "redux-observable";
import {Observable} from "rxjs/Observable";

export const loggerEpic : Epic<Action> = (action$ : ActionsObservable<Action>) => {
    return action$
        .do(action => console.log(action))
        .switchMap(() => Observable.empty());
}
