import React from "react";
import {NavLink} from "react-router-dom";
import {RoutePathEnum} from "../types/router";
import {AppBar, Toolbar, IconButton, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: theme.palette.common.white,
      textDecoration: 'none'
    },
  }),
)

const Navbar: React.FC = () => {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Button color="inherit">
          <NavLink to={RoutePathEnum.root} className={classes.link}>Root</NavLink>
        </Button>
        <Button color="inherit">
          <NavLink to={RoutePathEnum.contactList} className={classes.link}>Contacts list</NavLink>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar