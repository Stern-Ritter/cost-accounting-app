import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../model/storage";
import styles from "./about.module.css";

function About() {
  const [user] = useAuthState(auth);

  return (
    <>
      {!user && <Redirect to="/auth" />}
      <h1 className={styles.title}>О приложении</h1>
      <p className={styles.text}>
        Бесплатное приложение для аналитики расходов. Оно позволяет
        пользователям добавлять расходы по категориям и подкатегориям,
        отслеживать и анализировать расходы за выбранный период в удобном
        визуальном представлении.
      </p>
      <p className={styles.text}>Год выхода: 2022 г.</p>
    </>
  );
}

export default About;
