import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "Components/LandingPage";
import Home from "Components/Home";
import styles from "App.module.css";

export const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/home" component={Home} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
