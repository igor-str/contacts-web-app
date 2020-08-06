import React, {useEffect, useState} from "react";
import {List, ListItem, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Delete, Edit } from '@material-ui/icons';
import firebase from "firebase";
import {ContactInterface} from "../types/contact";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      margin: '0 auto',
      width: '100%',
      maxWidth: 360,
    },
    item: {
      marginBottom: 15,
      backgroundColor: theme.palette.background.paper,
    }
  }),
);

const ContactList: React.FC = () => {
  const classes = useStyles()
  const [contacts, setContacts] = useState<ContactInterface[]>([])
  const db = firebase.database()

  const fetchContactList = () => {
    const db = firebase.database()
    const contactsRef = db.ref('contacts')
    // contactsRef.on('value', (elem) => console.log(elem.val()))
    contactsRef.once('value', (snapshot) => {
      const localContacts: ContactInterface[] = []
      snapshot.forEach((childSnapshot) => {
        localContacts.push({
          ...childSnapshot.toJSON(),
          key: childSnapshot.key ? childSnapshot.key : Date.now().toString()
        } as ContactInterface)
      })
      setContacts(localContacts)
    });
  }

  const removeContact = async (event: React.MouseEvent, key: string) => {
    event.preventDefault()
    await db.ref(`contacts/${key}`).remove()
  }

  const listItems = contacts.map((contact: ContactInterface, index: number) =>
    <ListItem key={index} className={classes.item}>
      <ListItemText primary={contact.name} secondary={contact.phone} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={ event => removeContact(event, contact.key)}>
          <Edit />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={ event => removeContact(event, contact.key)}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )

  useEffect(() => fetchContactList())

  return (
    <List className={classes.list}>
      {listItems}
    </List>
  );
}

export default ContactList