import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="container">
        <Switch>
          <Route component={ContactForm} path="/" exac/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
