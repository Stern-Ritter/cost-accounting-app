import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";

function App() {
  return (
    <Router>
      <AppHeader />
      <main className={styles.main}>
        <Switch></Switch>
      </main>
    </Router>
  );
}

export default App;
