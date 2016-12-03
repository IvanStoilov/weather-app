import * as React from "react";
import {addCity} from "../../actions/city-list.actions.ts";
import {connect} from "react-redux";
import {AppStoreState} from "../../data/city-store";
import {IAddCityState} from "./add-city.reducer";
import {changeCityName} from "./add-city.actions";

interface IAddCityEvents {
    onChange: Function;
    onAdd: Function;
}

export interface IAddCityProps extends IAddCityState, IAddCityEvents {
}

const mapStateToProps = (state : AppStoreState) : IAddCityState => ({
    cityName: state.addCity.cityName
});

const mapDispatchToProps = (dispatch: Function, ownProps: IAddCityState) : IAddCityEvents => ({
    onChange: (event : KeyboardEvent) => {
        dispatch(changeCityName((event.target as HTMLInputElement).value));
    },
    onAdd: (event: Event) => {
        event.preventDefault(); // prevent the form from submitting

        if (ownProps.cityName !== '') {
            dispatch(addCity(ownProps.cityName));
            dispatch(changeCityName(''));
        }
    }
});

export function AddCityComponent(props: IAddCityProps) {
    return (
        <div>
            <div className="content-block-title">
                <label htmlFor="cityName">Enter a city:</label>
            </div>
            <form className="list-block" onSubmit={event => props.onAdd(event)}>
                <ul>
                    <li>
                        <div className="item-content">
                            <div className="item-inner">
                                <div className="item-input">
                                    <input
                                        type="text"
                                        id="cityName"
                                        value={props.cityName}
                                        onChange={event => props.onChange(event)} />
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                <p className="content-block">
                    <button className="button button-fill" type="submit">Add city</button>
                </p>
            </form>
        </div>
    );
}

export const AddCity = connect(mapStateToProps, mapDispatchToProps)(AddCityComponent);
