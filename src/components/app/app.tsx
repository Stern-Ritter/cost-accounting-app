import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./app.module.css";

function App() {
  return (
    <Router>
      <main className={styles.main}>
        <Switch></Switch>
      </main>
    </Router>
  );
}

export default App;
