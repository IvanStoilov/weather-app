import * as React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {CityListActions} from "./city-list/index";

interface INavbarProps {
  reloadAll: Function;
}

const mapDispatchToProps = (dispatch : Function) => ({
  reloadAll: () => dispatch(CityListActions.reloadAll())
});

export function NavbarElement(props: INavbarProps) {
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="center sliding">
          <Link to="/" className="home-link">
            The Weather App
          </Link>
        </div>
        <div className="right">
          <a href="javascript://" className="link icon-only" onClick={() => props.reloadAll()}>
            <i className="md-icon">loop</i>
          </a>
          <Link to="/add" className="link icon-only">
            <i className="md-icon">add</i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Navbar = connect(null, mapDispatchToProps)(NavbarElement);
