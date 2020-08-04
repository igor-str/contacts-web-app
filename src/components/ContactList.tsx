import React, {useEffect, useState} from "react";
import {List, ListItem, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import firebase from "firebase";
import {ContactInterface} from "../types/contact";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const ContactList: React.FC = () => {
  const classes = useStyles()
  const [contacts, setContacts] = useState<ContactInterface[]>([])

  const fetchContactList = () => {
    const db = firebase.database()
    const contactsRef = db.ref('contacts')
    // contactsRef.on('value', (elem) => console.log(elem.val()))
    contactsRef.once('value', (snapshot) => {
      const localContacts: ContactInterface[] = []
      snapshot.forEach((childSnapshot) => {
        localContacts.push(childSnapshot.toJSON() as ContactInterface)
      })
      setContacts(localContacts)
    });
  }

  const listItems = contacts.map((contact: ContactInterface, index: number) =>
    <ListItem key={index}>
      <ListItemText primary={contact.name} secondary={contact.phone} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )

  useEffect(() => fetchContactList())

  return (
    <List className={classes.root}>
      {listItems}
    </List>
  );
}

export default ContactList