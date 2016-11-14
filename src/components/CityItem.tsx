import * as Immutable from "Immutable";
import * as React from "react";
import {City} from "../types";

interface ICityItemProps {
  city: City;
  onDelete: Function;
  onReload: Function;
}

export class CityItem extends React.Component<ICityItemProps, {}> {
  constructor() {
    super();
  }

  render() : JSX.Element {
    return (
      <div className="card">
        <div className="card-header">{this.props.city.name}</div>
        <div className="card-content">
          <div className="card-content-inner">
            Sunny!
            <p>
              {this.getImage()}
            </p>
          </div>
        </div>
        <div className="card-footer">
          <button type="button" className="button" onClick={() => this.props.onDelete()}>Remove</button>
          <button type="button" className="button" onClick={() => this.props.onReload()}>Reload</button>
        </div>
      </div>
    )
  }

  private getImage() : JSX.Element {
    if (this.props.city.isFetching) { 
      return <img className="small-image" src="https://stanfy.com/wp-content/uploads/2015/09/1-V3h-VWthi5lL0QySF6qZPw.gif" />
    } else if (this.props.city.imageUrl) {
      return <img className="small-image" src={this.props.city.imageUrl} />
    }

    return null;
  }
}
