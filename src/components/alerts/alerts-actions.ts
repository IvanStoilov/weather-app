import {AlertType, IAlert} from ".";

export const AlertActionTypes = {
    ADD: 'alert-actions/ADD',
    POP: 'alert-actions/POP'
};

export const showAlert = (message: string, type: AlertType = 'success', duration = 3000) => {
    return {
        type: AlertActionTypes.ADD,
        alert: { message, type, duration }
    }
}

export const popAlert = (alert: IAlert) => {
    return {
        type: AlertActionTypes.POP,
        alert
    }
}
