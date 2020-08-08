import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import {routeList} from "./router"
import {RouteInterface} from "./types/router";
import {Grid} from '@material-ui/core';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Grid>
        <Switch>
          {
            routeList.map((route: RouteInterface, index: number) => {
              return <Route key={index} component={route.component} path={route.path} exact={route.exact}/>
            })
          }
        </Switch>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
