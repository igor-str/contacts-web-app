import React from "react";

const ContactForm: React.FC = () => {
  return (
    <div className="row">
      <form className="col s12">
        <h3 className="indigo-text center-align">Add new contact</h3>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" className="validate"/>
            <label htmlFor="icon_prefix">First Name</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">phone</i>
            <input id="icon_telephone" type="tel" className="validate"/>
            <label htmlFor="icon_telephone" className="active">Telephone</label>
          </div>
        </div>
        <button className="waves-effect indigo btn-large">Submit</button>
      </form>
    </div>
  )
}

export default ContactForm