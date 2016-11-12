import * as React from "react";
import {AddCity} from "./AddCity";

export class App extends React.Component<{}, {}> {
    render() : JSX.Element {
        return (
            <AddCity onAdd={(a) => alert(a)}/>
        );
    }
}
