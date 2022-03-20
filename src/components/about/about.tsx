import React from "react";
import styles from "./about.module.css";

function About() {
  return (
    <>
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
