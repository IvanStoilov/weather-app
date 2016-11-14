import * as React from "react";

interface IAddCityProps {
  onAdd(newCityName: string): void;
}

export class AddCity extends React.Component<IAddCityProps, {cityName: string}> {
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

    this.props.onAdd(this.state.cityName);
    this.setState({cityName: ''});
    
    event.preventDefault(); // prevent the form from submitting
  }

  private handleChange(event : KeyboardEvent) {
    this.setState({cityName: (event.target as HTMLInputElement).value});
  }
}
