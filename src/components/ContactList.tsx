import React from "react";

const ContactList: React.FC = () => {
  return (
    <ul className="collection">
      <li className="collection-item">
        <div>
          Alvin
          <a href="#!" className="secondary-content"><i className="material-icons">edit</i></a>
          <a href="#!" className="secondary-content"><i className="material-icons">delete</i></a>
        </div>
      </li>
    </ul>
  )
}

export default ContactList