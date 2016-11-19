import * as React from "react";
import * as Immutable from "immutable";
import * as CityListActions from "../actions/city-list.actions";

import {Store} from "redux";
import {AddCity} from "./AddCity";
import {CityList} from "./CityList";
import {ICity} from "../data/city";
import {CityStore} from "../data/city-store";
import {CityStoreComponent} from "../custom-typings/city-store-component";
import {Link} from "react-router";
import {Navbar} from "../components/Navbar";

export class App extends CityStoreComponent<{}, {}> {
    private store : CityStore = this.context.store;

    render() : JSX.Element {
        return (
            <div className="view view-main">
                <Navbar />
                <div className="pages navbar-through toolbar-through">
                    <div data-page="index" className="page">
                        <div className="page-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    store: React.PropTypes.object
}
