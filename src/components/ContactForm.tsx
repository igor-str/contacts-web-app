import React, {useState} from "react";
import firebase from "firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField, Grid, Button} from '@material-ui/core';
import {ContactInterface} from "../types/contact";
import {createStyles, makeStyles} from "@material-ui/core/styles";

interface ContactFormProps {
  contact: ContactInterface
  onClose(): void
}

const useStyles = makeStyles(() =>
  createStyles({
    btnBox: {
      marginTop: 15,
    },
  }),
)

const ContactForm: React.FC<ContactFormProps> = ({contact, onClose}) => {
  const db = firebase.database()
  const classes = useStyles()
  const [name, setName] = useState<string>(contact.name)
  const [phone, setPhone] = useState<string>(contact.phone)
  const errorNotification = (notification: string) => toast.error(notification);
  const successNotification = (notification: string) => toast.success(notification);

  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => (setName(event.target.value))

  const changePhoneHandler = (event: React.ChangeEvent<HTMLInputElement>) => (setPhone(event.target.value))

  const isPhoneNumberValid = (phone: string): boolean => {
    const regEx = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g

    return regEx.test(phone)
  }

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !phone.trim()) {
      errorNotification('oops... all values must be filled!')
      return
    }

    if (!isPhoneNumberValid(phone)) {
      errorNotification('phone number must be correct!')
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
    onClose()
  }

  const clearFormFields = () => {
    setName('')
    setPhone('')
  }

  return (
    <>
      <ToastContainer />
      <form noValidate autoComplete="off" onSubmit={sendForm}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField id="name" label="Name" fullWidth={true} value={name} onChange={changeNameHandler}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="phone" label="Phone number" fullWidth={true} value={phone} onChange={changePhoneHandler}/>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-end" alignItems="center" className={classes.btnBox}>
          <Button autoFocus color="primary" type="submit">
            Submit
          </Button>
          <Button color="secondary" onClick={onClose}>
            Close
          </Button>
        </Grid>
      </form>
    </>
  )
}

export default ContactForm