import * as React from "react";
import {CityStoreComponent} from "../custom-typings/city-store-component";
import {Navbar} from "../components/navbar.component";

export class App extends CityStoreComponent<{}, {}> {
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
