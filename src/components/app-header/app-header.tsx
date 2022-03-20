import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={styles.header} data-testid="header">
      <Link to="/" className={styles.logo}>
        <span className={styles.image} />
        Учет расходов
      </Link>
      <nav>
        <ul className={styles.list}>
          <li className={styles["list-item"]}>
            <NavLink
              className={styles.link}
              activeClassName={styles.activeLink}
              to="/expenses"
            >
              Расходы
            </NavLink>
          </li>
          <li className={styles["list-item"]}>
            <NavLink
              className={styles.link}
              activeClassName={styles.activeLink}
              to="/analytics"
            >
              Аналитика
            </NavLink>
          </li>
          <li className={styles["list-item"]}>
            <NavLink
              className={styles.link}
              activeClassName={styles.activeLink}
              to="/settings"
            >
              Настройки
            </NavLink>
          </li>
          <li className={styles["list-item"]}>
            <NavLink
              className={styles.link}
              activeClassName={styles.activeLink}
              to="/about"
            >
              О проекте
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
