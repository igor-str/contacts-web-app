import React, {useState} from "react";
import firebase from "firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField, Button, Grid} from '@material-ui/core';
import {Save} from '@material-ui/icons';
import {ContactInterface} from "../types/contact";

interface ContactFormProps {
  contact: ContactInterface
}

const ContactForm: React.FC<ContactFormProps> = ({contact}) => {
  const db = firebase.database()
  const [name, setName] = useState<string>(contact.name)
  const [phone, setPhone] = useState<string>(contact.phone)
  const errorNotification = (notification: string) => toast.error(notification);
  const successNotification = (notification: string) => toast.success(notification);

  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => (setName(event.target.value))

  const changePhoneHandler = (event: React.ChangeEvent<HTMLInputElement>) => (setPhone(event.target.value))

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !phone.trim()) {
      errorNotification('oops... all values must be filled!')
      return
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
    <>
      <ToastContainer />
      <form noValidate autoComplete="off" onSubmit={sendForm}>
        <h3 className="indigo-text center-align">Add new contact</h3>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField id="name" label="Name" fullWidth={true} value={name} onChange={changeNameHandler}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="phone" label="Phone number" fullWidth={true} value={phone} onChange={changePhoneHandler}/>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Save />}
        >
          Save and submit
        </Button>
        <Button variant="contained" size="large">Default</Button>
      </form>
    </>
  )
}

export default ContactForm