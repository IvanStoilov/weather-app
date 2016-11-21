import {Component} from "react";
import {CityStore} from "../data/city-store";

export class CityStoreComponent<P, S> extends Component<P, S> {
    context: {
        store: CityStore;
        router?: {
            replace: Function;
        }
    };
    static contextTypes: any;
}
