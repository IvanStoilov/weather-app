import * as React from "react";
import {CityItem} from "../city-item/city-item.component";
import {ICity} from "../../data/city";
import {deleteCity, reloadCity} from "../../actions/city-list.actions.ts";
import {Link} from "react-router";
import {connect} from "react-redux";
import {AppStoreState} from "../../data/city-store";
import {CityList as CityListCollection} from "../../data/city-list";

interface ICityListState {
    cities: CityListCollection;
}

interface ICityListEvents {
    onDeleteCity: Function;
    onReload: Function;
}

interface CityListProps extends ICityListState, ICityListEvents {
}

const mapStateToProps = (state : AppStoreState) : ICityListState => ({
    cities: state.cities
});

const mapDispatchToProps = (dispatch : (action: any) => any) => ({
    onDeleteCity: (city: ICity) => dispatch(deleteCity(city)),
    onReload: (city: ICity) => dispatch(reloadCity(city))
});

function CityListElement(props : CityListProps) {
    const cities = props.cities.map((city : ICity) =>
        <CityItem
            key={city.id}
            city={city}
            onDelete={() => props.onDeleteCity(city)}
            onReload={() => props.onReload(city)} />
    ).toJS();

    return (
        <div>
            {cities.length ? cities : getEmptyState()}
        </div>
    );

    function getEmptyState() : JSX.Element {
        return (
            <div className="content-block">
                <p>Great to see you here! Let's start by adding your city</p>
                    <Link to="/add" className="button button-fill">Add your first city</Link>
            </div>
        );
    }
}

export const CityList = connect(mapStateToProps, mapDispatchToProps)(CityListElement);
