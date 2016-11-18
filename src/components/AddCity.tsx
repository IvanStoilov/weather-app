import * as React from "react";
import {addCity} from "../actions/city-list.actions";
import {CityStoreComponent} from "../types";

export class AddCity extends CityStoreComponent<{}, {cityName: string}> {
  constructor() {
    super();
  }

  componentWillMount() {
    this.setState({cityName: ''});
  }

  render(): JSX.Element {
    return ( 
      <form onSubmit={this.handleAdd.bind(this)}>
         <div className="item-input">
          <input 
            type="text"
            value={this.state.cityName} 
            onChange={this.handleChange.bind(this)} />

          <button className="button button-fill" type="submit">Add city</button>
        </div>
      </form>
    );
  }

  private handleAdd(event: Event) {
    if (this.state.cityName === '') {
      return ;
    }

    this.context.store.dispatch(addCity(this.state.cityName));
    this.setState({cityName: ''});
    
    event.preventDefault(); // prevent the form from submitting
  }

  private handleChange(event : KeyboardEvent) {
    this.setState({cityName: (event.target as HTMLInputElement).value});
  }
}

AddCity.contextTypes = {
    store: React.PropTypes.object
}
