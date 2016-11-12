import * as React from "react";

interface IAddCityProps {
  onAdd(newCityName: string): void;
}

export class AddCity extends React.Component<IAddCityProps, {}> {
  state = {
    newCityName: ''
  };

  render(): JSX.Element {
    return ( 
      <form onSubmit={this.handleAdd.bind(this)}>
        <input type="text" value={this.state.newCityName} onChange={this.handleChange.bind(this)} />
        <button type="submit">Add city</button>
      </div>
    );
  }

  private handleAdd() {
    this.props.onAdd(this.state.newCityName);
  }

  private handleChange(event : KeyboardEvent) {
    this.setState({newCityName: event.target.value});
  }
}
