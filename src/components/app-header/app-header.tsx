import React from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../model/storage";
import styles from "./app-header.module.css";

function AppHeader() {
  const [user] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
  };

  return (
    <header className={styles.header} data-testid="header">
      <Link to="/" className={styles.logo}>
        <span className={styles.image} />
        Учет расходов
      </Link>
      <nav>
        <ul className={styles.list}>
          {user ? (
            <>
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
                  to="/analytics/table"
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
              <li className={styles["list-item"]}>
                <button className={styles.button} onClick={logout}>
                  Выйти
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={styles["list-item"]}>
                <NavLink
                  className={styles.link}
                  activeClassName={styles.activeLink}
                  to="/auth"
                >
                  Войти
                </NavLink>
              </li>
              <li className={styles["list-item"]}>
                <NavLink
                  className={styles.link}
                  activeClassName={styles.activeLink}
                  to="/reg"
                >
                  Регистрация
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
