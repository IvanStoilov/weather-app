import * as React from "react";
import {addCity} from "../actions/city-list.actions";
import {CityStoreComponent} from "../custom-typings/city-store-component";

export class AddCity extends CityStoreComponent<{}, {cityName: string}> {
    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({cityName: ''});
    }

    render(): JSX.Element {
        return (
            <div>
                <div className="content-block-title">
                    <label htmlFor="cityName">Enter a city:</label>
                </div>
                <form className="list-block" onSubmit={this.handleAdd.bind(this)}>
                    <ul>
                        <li>
                            <div className="item-content">
                                <div className="item-inner">
                                    <div className="item-input">
                                        <input
                                            type="text"
                                            id="cityName"
                                            value={this.state.cityName}
                                            onChange={this.handleChange.bind(this)} />
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

    private handleAdd(event: Event) {
        if (this.state.cityName === '') {
            return ;
        }

        this.context.store.dispatch(addCity(this.state.cityName));
        this.setState({cityName: ''});
        this.context.router.replace('/');

        event.preventDefault(); // prevent the form from submitting
    }

    private handleChange(event : KeyboardEvent) {
        this.setState({cityName: (event.target as HTMLInputElement).value});
    }
}

AddCity.contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object
}
