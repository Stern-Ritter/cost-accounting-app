import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../model/storage";
import styles from './main-page.module.css';

function MainPage() {
  const [user] = useAuthState(auth);

  return (
    <>
      {!user && <Redirect to="/auth" />}
      <h1 className={styles.title}>Приложение учета ваших расходов</h1>
      <p className={styles.text}>Добро пожаловать, {user?.email}</p>
    </>
  );
}

export default MainPage;
