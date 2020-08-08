import React, {useEffect, useState} from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Fab,
  Box,
} from '@material-ui/core';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {Delete, Edit, Add} from '@material-ui/icons';
import firebase from "firebase";
import {ContactInterface, emptyContactDto} from "../types/contact";
import ContactForm from "../components/ContactForm";
import Preloader from "../components/Preloader";

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
    },
    fabButton: {
      position: 'fixed',
      zIndex: 1,
      bottom: 15,
      right: 15,
    },
  }),
)

const ContactList: React.FC = () => {
  const db = firebase.database()
  const classes = useStyles()
  const [contacts, setContacts] = useState<ContactInterface[]>([])
  const [contact, setContact] = useState<ContactInterface>(emptyContactDto)
  const [loading, setLoading] = useState<boolean>(true)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

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
      setLoading(false)
    });
  }

  const handleDialogClose = () => {
    setIsEditMode(false)
    setContact(emptyContactDto)
    setIsDialogOpen(false)
  }

  const handleDialogEdit = async (event: React.MouseEvent, contact: ContactInterface) => {
    event.preventDefault()
    setContact(contact)
    setIsEditMode(true)
    setIsDialogOpen(true)
  }

  const handleDialogAdd = async () => {
    setContact(contact)
    setIsDialogOpen(true)
  }

  const removeContact = async (event: React.MouseEvent, key: string) => {
    event.preventDefault()
    await db.ref(`contacts/${key}`).remove()
  }

  const listItems = contacts.map((contact: ContactInterface, index: number) =>
    <ListItem key={index} className={classes.item}>
      <ListItemText primary={contact.name} secondary={contact.phone}/>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={event => handleDialogEdit(event, contact)}>
          <Edit/>
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={event => removeContact(event, contact.key)}>
          <Delete/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )

  useEffect(() => fetchContactList())

  return (
    <>
      <List className={classes.list}>
        {listItems}
      </List>
      <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={() => handleDialogAdd()}>
        <Add/>
      </Fab>
      {isDialogOpen && <Dialog open={isDialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
              <Box textAlign="center">
                {isEditMode ? "Edit contact" : "Create contact"}
              </Box>
          </DialogTitle>
          <DialogContent dividers>
              <ContactForm contact={contact} onClose={handleDialogClose}/>
          </DialogContent>
      </Dialog>}
      {loading && <Preloader/>}
    </>
  )
}

export default ContactList