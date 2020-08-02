import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="row">
      <div className="nav-wrapper col s12 indigo">
        <a className="brand-logo" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Contacts
          app</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/">Create new contact</NavLink></li>
          <li><NavLink to="/">Contacts list</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar