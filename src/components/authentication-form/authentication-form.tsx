import React, { FormEvent, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { State } from "../../services/store/store";
import {
  AUTHENTICATION_FORM_CLEAR_STATE,
  setAuthenticationFormValue,
  setAuthenticationFormErrorMessage,
} from "../../services/actions";
import { auth } from "../../model/storage";
import styles from "./authentication-form.module.css";

function AuthenticationForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: AUTHENTICATION_FORM_CLEAR_STATE });
  }, [dispatch]);

  const {
    error,
    data: { email, password },
  } = useSelector((store: State) => store.authenticationForm);

  const onFormChange = (evt: FormEvent) => {
    const input = evt.target as HTMLInputElement;
    dispatch(
      setAuthenticationFormValue({ field: input.name, value: input.value })
    );
  };

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push({ pathname: "/" });
      })
      .catch((err) => {
        dispatch(setAuthenticationFormErrorMessage(err.message));
      });
  };

  const clearForm = () => {
    dispatch({ type: AUTHENTICATION_FORM_CLEAR_STATE });
  };

  return (
    <>
      <h1 className={styles.title}>Войти:</h1>
      <form
        className={styles.form}
        onSubmit={onFormSubmit}
        name="authentication-form"
      >
        <label className={styles.label} htmlFor="email">
          E-mail:
        </label>
        <input
          className={styles.input}
          type="email"
          onChange={onFormChange}
          value={email}
          name="email"
          id="email"
          minLength={3}
          required
        />
        <label className={styles.label} htmlFor="password">
          Пароль:
        </label>
        <input
          className={styles.input}
          type="password"
          onChange={onFormChange}
          value={password}
          name="password"
          id="password"
          minLength={6}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttons}>
          <button className={styles.button} type="button" onClick={clearForm}>
            Очистить форму
          </button>
          <button className={styles.button} type="submit">
            Войти
          </button>
        </div>
      </form>
    </>
  );
}

export default AuthenticationForm;
