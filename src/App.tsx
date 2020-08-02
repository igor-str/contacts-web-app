import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import {routeList} from "./router"
import {RouteInterface} from "./types/router";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="container">
        <Switch>
          {
            routeList.map((route: RouteInterface, index: number) => {
              return <Route key={index} component={route.component} path={route.path} exact={route.exact}/>
            })
          }
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
