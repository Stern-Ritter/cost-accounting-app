import React, { FormEvent, useEffect, useMemo } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { State } from "../../services/store/store";
import {
  CREATE_USER_FORM_CLEAR_STATE,
  setCreateUserFormValue,
  setCreateUserFormErrorMessage,
} from "../../services/actions";
import { auth } from "../../model/storage";
import styles from "./create-user-form.module.css";

function CreateUserForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: CREATE_USER_FORM_CLEAR_STATE });
  }, [dispatch]);

  const {
    error,
    data: { email, password, repeatPassword },
  } = useSelector((store: State) => store.createUserForm);

  const isRepeatPasswordNotMatch = useMemo(
    () => password !== repeatPassword,
    [password, repeatPassword]
  );

  const onFormChange = (evt: FormEvent) => {
    const input = evt.target as HTMLInputElement;
    dispatch(setCreateUserFormValue({ field: input.name, value: input.value }));
  };

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push({ pathname: "/" });
      })
      .catch((err) => {
        dispatch(setCreateUserFormErrorMessage(err.message));
      });
  };

  const clearForm = () => {
    dispatch({ type: CREATE_USER_FORM_CLEAR_STATE });
  };

  return (
    <>
      <h1 className={styles.title}>Регистрация:</h1>
      <form
        className={styles.form}
        onSubmit={onFormSubmit}
        name="create-user-form"
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
        <label className={styles.label} htmlFor="repeat-password">
          Повторите пароль:
        </label>
        <input
          className={styles.input}
          type="password"
          onChange={onFormChange}
          value={repeatPassword}
          name="repeatPassword"
          id="repeatPassword"
          minLength={6}
          required
        />
        {isRepeatPasswordNotMatch && (
          <p className={styles.error}>Пароли не совпадают</p>
        )}
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttons}>
          <button className={styles.button} type="button" onClick={clearForm}>
            Очистить форму
          </button>
          <button
            className={styles.button}
            type="submit"
            disabled={isRepeatPasswordNotMatch}
          >
            Создать
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateUserForm;
