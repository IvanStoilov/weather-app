import * as React from "react";
import {Link} from "react-router";

export class Navbar extends React.Component<{}, {cityName: string}> {
  constructor() {
    super();
  }

  componentWillMount() {
    this.setState({cityName: ''});
  }

  render(): JSX.Element {
    return ( 
      <div className="navbar">
        <div className="navbar-inner">
          <div className="center sliding">
            <Link to="/" className="home-link">
              The Weather App
            </Link>
          </div>
          <div className="right">
            <a href="javascript://">
              <i className="icon icon-forward"></i>
            </a>
            <Link to="/add" className="link icon-only open-panel">
              <i className="icon icon-plus"></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
