import * as React from "react";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {AppStoreState} from "../../data/city-store";
import {IAlertsState, IAlertList, IAlert, AlertsActions} from ".";

interface IAlertProps {
    popAlert?: Function;
    alerts: IAlertsState;
}

const mapStateToProps = (state : AppStoreState) : IAlertProps => ({
    alerts: state.alerts
});

const mapDispatchToProps = (dispatch: any) : {} => bindActionCreators(AlertsActions, dispatch);

function AlertsComponent(props: IAlertProps) : JSX.Element {
    return (
        <div className="alerts-container">
            {getAlerts(props.alerts)}
        </div>
    );

    function getAlerts(alerts : IAlertList) : JSX.Element[] {
        if (alerts && alerts.size > 0) {
            return alerts.map(getAlertElement).toArray();
        }
        
        return null;
    }

    function getAlertElement(alert: IAlert) : JSX.Element {
        const className = `alert-item alert-${alert.type}`;
        
        return (
            <a className={className} onClick={() => props.popAlert(alert)}>
                {alert.message}
            </a>
        );
    }
}

export const Alerts = connect(mapStateToProps, mapDispatchToProps)(AlertsComponent);
