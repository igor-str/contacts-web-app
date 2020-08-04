import React, {useState} from "react";
import firebase from "firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const db = firebase.database()
  const errorNotification = (notification: string) => toast.error(notification);
  const successNotification = (notification: string) => toast.success(notification);

  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => (setName(event.target.value))

  const changePhoneHandler = (event: React.ChangeEvent<HTMLInputElement>) => (setPhone(event.target.value))

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !phone.trim()) {
      errorNotification('oops... all values must be filled!')
    }

    const response = await db.ref('contacts').push({
      name: name,
      phone: phone,
    })

    if (!response) {
      errorNotification('oops... something went wrong!')
    }

    successNotification(`contact ${name} was created!`)
    clearFormFields()
  }

  const clearFormFields = () => {
    setName('')
    setPhone('')
  }

  return (
    <div className="row">
      <ToastContainer />
      <form className="col s12" onSubmit={sendForm}>
        <h3 className="indigo-text center-align">Add new contact</h3>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" className="validate" value={name} onChange={changeNameHandler}/>
            <label htmlFor="icon_prefix" className="active">First Name</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">phone</i>
            <input id="icon_telephone" type="tel" className="validate" value={phone} onChange={changePhoneHandler}/>
            <label htmlFor="icon_telephone" className="active">Telephone</label>
          </div>
        </div>
        <button className="waves-effect indigo btn-large" type={"submit"}>Submit</button>
      </form>
    </div>
  )
}

export default ContactForm