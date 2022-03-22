import React, { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../services/store/store";
import {
  setCategoryFormValue,
  CATEGORY_FORM_CLEAR_STATE,
  CREATE_CATEGORY_CLEAR_STATUS,
  createCategory,
} from "../../services/actions";
import MultipleInput from "../multiple-input/multiple-input";
import Category from "../../model/category/Category";
import styles from "./settings-form.module.css";

function SettingsForm() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CATEGORY_FORM_CLEAR_STATE });
    dispatch({ type: CREATE_CATEGORY_CLEAR_STATUS });
  }, [dispatch]);

  const { name, subcategories, description } = useSelector(
    (store: State) => store.categoryForm.data
  );
  const isLoading = useSelector(
    (store: State) => store.expenses.createCategoryRequest
  );
  const hasError = useSelector(
    (store: State) => store.expenses.createCategoryFailed
  );

  const onFormChange = (evt: FormEvent) => {
    const input = evt.target as HTMLInputElement;
    dispatch(setCategoryFormValue({ field: input.name, value: input.value }));
  };

  const onMultipleInputChange = (data: { field: string; value: string[] }) => {
    dispatch(setCategoryFormValue(data));
  };

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const category = new Category({
      name,
      subcategories,
      description,
    });
    dispatch(createCategory(category));
  };

  const clearForm = () => {
    dispatch({ type: CATEGORY_FORM_CLEAR_STATE });
  };

  return (
    <>
      <h1 className={styles.title}>Создать категорию:</h1>
      <form
        className={styles.form}
        onSubmit={onFormSubmit}
        name="category-form"
      >
        <label className={styles.label} htmlFor="name">
          Категория:
        </label>
        <input
          className={styles.input}
          type="text"
          onChange={onFormChange}
          value={name}
          name="name"
          id="name"
          minLength={3}
          required
        />
        <label className={styles.label} htmlFor="subcategories">
          Подкатегории:
        </label>
        <MultipleInput
          name="subcategories"
          value={subcategories}
          placeholder="Нажмите Enter чтобы добавить"
          onValueChange={onMultipleInputChange}
        />
        <label className={styles.label} htmlFor="description">
          Описание:
        </label>
        <textarea
          className={styles.description}
          onChange={onFormChange}
          value={description}
          name="description"
          id="description"
        />
        {hasError && (
          <p className={styles["create-error"]}>
            При создании возникла ошибка... Попробуйте позже.
          </p>
        )}
        <div className={styles.buttons}>
          <button
            className={styles.button}
            type="button"
            onClick={clearForm}
            disabled={isLoading}
          >
            Очистить форму
          </button>
          <button className={styles.button} type="submit" disabled={isLoading}>
            Создать
          </button>
        </div>
      </form>
    </>
  );
}

export default SettingsForm;
