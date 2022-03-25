import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import AppHeader from "../app-header/app-header";
import ExpensesForm from "../expenses-form/expenses-form";
import Analytics from "../analytics/analytics";
import SettingsForm from "../settings-form/settings-from";
import About from "../about/about";
import CreateUserForm from "../create-user-form/create-user-form";
import AuthenticationForm from "../authentication-form/authentication-form";
import { getCategories, getExpenses } from "../../services/actions";
import { auth } from "../../model/storage";
import styles from "./app.module.css";

function App() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      dispatch(getCategories(user.uid));
      dispatch(getExpenses(user.uid));
    }
  }, [user]);

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
          <Route path="/auth" exact>
            <AuthenticationForm />
          </Route>
          <Route path="/reg" exact>
            <CreateUserForm />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
