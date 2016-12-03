import {Component} from "react";
import {AppStore} from "../data/city-store";

export class CityStoreComponent<P, S> extends Component<P, S> {
    context: {
        store: AppStore;
        router?: {
            replace: Function;
        }
    };
    static contextTypes: any;
}
