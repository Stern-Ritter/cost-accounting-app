import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import ExpensesForm from "../expenses-form/expenses-form";
import Analytics from "../analytics/analytics";
import SettingsForm from "../settings-form/settings-from";
import About from "../about/about";
import { getCategories, getExpenses } from "../../services/actions";
import styles from "./app.module.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getExpenses());
  }, []);

  return (
    <Router>
      <AppHeader />
      <main className={styles.main}>
        <Switch>
          <Route path="/expenses" exact>
            <ExpensesForm />
          </Route>
          <Route path="/analytics/:type" exact>
            <Analytics />
          </Route>
          <Route path="/settings" exact>
            <SettingsForm />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
