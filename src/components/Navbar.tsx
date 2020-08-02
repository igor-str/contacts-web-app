import React from "react";
import {NavLink} from "react-router-dom";
import {RoutePathEnum} from "../types/router";

const Navbar: React.FC = () => {
  return (
    <nav className="row">
      <div className="nav-wrapper col s12 indigo">
        <NavLink to={RoutePathEnum.root} className="brand-logo">Contacts app</NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to={RoutePathEnum.root}>Create new contact</NavLink></li>
          <li><NavLink to={RoutePathEnum.contactList}>Contacts list</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar