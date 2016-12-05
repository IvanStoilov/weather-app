import * as React from "react";
import * as ReactDOM from "react-dom";
import {addCity} from "../city-list/city-list.actions.ts";
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

const mapDispatchToProps = (dispatch: Function, ownProps: any) : IAddCityEvents => ({
    onChange: (event : KeyboardEvent) => {
        dispatch(changeCityName((event.target as HTMLInputElement).value));
    },
    onAdd: (event: Event, cityName : string) => {
        event.preventDefault(); // prevent the form from submitting

        if (cityName !== '') {
            dispatch(addCity(cityName));
            dispatch(changeCityName(''));

            ownProps.router.replace('/');
        }
    }
});

export class AddCityComponent extends React.Component<IAddCityProps, {}> {
    componentDidMount() {
        (ReactDOM.findDOMNode(this.refs['nameInput']) as HTMLInputElement).focus();
    }

    render() : JSX.Element {
        return (
            <div>
                <div className="content-block-title">
                    <label htmlFor="cityName">Enter a city:</label>
                </div>
                <form className="list-block" onSubmit={event => this.props.onAdd(event, this.props.cityName)}>
                    <ul>
                        <li>
                            <div className="item-content">
                                <div className="item-inner">
                                    <div className="item-input">
                                        <input
                                            ref="nameInput"
                                            type="text"
                                            id="cityName"
                                            value={this.props.cityName}
                                            onChange={event => this.props.onChange(event)} />
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
}

export const AddCity = connect(mapStateToProps, mapDispatchToProps)(AddCityComponent);
