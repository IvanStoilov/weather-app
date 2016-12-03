import * as React from "react";
import {CityItem} from "./CityItem";
import {ICity} from "../data/city";
import {AppStore} from "../data/city-store";
import {deleteCity, reloadCity} from "../actions/city-list.actions";
import {CityStoreComponent} from "../custom-typings/city-store-component";
import {Unsubscribe} from "redux/index";
import {Link} from "react-router";

export class CityList extends CityStoreComponent<{}, {}> {
    private store : AppStore;
    private unsubscribe : Unsubscribe;

    componentWillMount() {
        this.store = this.context.store;
        this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    constructor() {
        super();
    }

    render() : JSX.Element {
        const cities = this.store.getState().cities.map(city =>
            <CityItem
                key={city.id}
                city={city}
                onDelete={this.onDeleteCity.bind(this, city)}
                onReload={this.onReload.bind(this, city)} />
        ).toJS();

        return (
            <div>
                {cities.length ? cities : this.getEmptyState()}
            </div>
        )
    }

    private getEmptyState() : JSX.Element {
        return (
            <div className="content-block">
                <p>Great to see you here! Let's start by adding your city</p>
                <Link to="/add" className="button button-fill">Add your first city</Link>
            </div>
        );
    }

    private onDeleteCity(city: ICity) {
        this.context.store.dispatch(deleteCity(city));
    }

    private onReload(city: ICity) {
        this.context.store.dispatch(reloadCity(city));
    }
}

CityList.contextTypes = {
    store: React.PropTypes.object
}
