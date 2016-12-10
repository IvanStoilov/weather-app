import * as React from "react";
import {CityStoreComponent} from "../custom-typings/city-store-component";
import {Navbar} from "../components/navbar.component";
import {Alerts} from "../components/alerts";

export class App extends CityStoreComponent<{}, {}> {
    render() : JSX.Element {
        return (
            <div className="view view-main">
                <Navbar />
                <Alerts />
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
