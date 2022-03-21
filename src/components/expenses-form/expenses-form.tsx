import React, { FormEvent, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import { State } from "../../services/store/store";
import {
  setTrasnactionFormValue,
  TRANSACTION_FORM_CLEAR_STATE,
  CREATE_TRANSACTION_CLEAR_STATUS,
  createTransaction,
} from "../../services/actions";
import Transaction from "../../model/transaction/Transaction";
import styles from "./expenses-form.module.css";

function ExpensesForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: TRANSACTION_FORM_CLEAR_STATE });
    dispatch({ type: CREATE_TRANSACTION_CLEAR_STATUS });
  }, [dispatch]);

  const { eventDate, category, subcategory, amount } = useSelector(
    (store: State) => store.trasnactionForm.data
  );
  const isLoading = useSelector(
    (store: State) => store.expenses.createTransactionRequest
  );
  const hasError = useSelector(
    (store: State) => store.expenses.createTransactionFailed
  );

  const categories = useSelector(
    (store: State) => store.expenses.categories.data
  );

  const categoriesForSelection = useMemo(
    () => categories.map((el) => ({ value: el.name, label: el.name })),
    [categories]
  );

  const subcategoriesForSelection = useMemo(
    () =>
      (categories.find((el) => el.name === category)?.subcategories || []).map(
        (element) => ({ value: element, label: element })
      ),
    [categories, category]
  );

  const onFormChange = (evt: FormEvent) => {
    const input = evt.target as HTMLInputElement;
    dispatch(
      setTrasnactionFormValue({ field: input.name, value: input.value })
    );
  };

  const onCategoryChange = (
    status: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    if (status?.value) {
      dispatch(
        setTrasnactionFormValue({
          field: "category",
          value: status.value,
        })
      );
    } else {
      dispatch(
        setTrasnactionFormValue({
          field: "category",
          value: "",
        })
      );
    }
  };

  const onSubcategoryChange = (
    status: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    if (status?.value) {
      dispatch(
        setTrasnactionFormValue({
          field: "subcategory",
          value: status.value,
        })
      );
    } else {
      dispatch(
        setTrasnactionFormValue({
          field: "subcategory",
          value: "",
        })
      );
    }
  };

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const transaction = new Transaction({
      eventDate,
      category,
      subcategory,
      amount,
    });
    dispatch(createTransaction(transaction, history));
  };

  const clearForm = () => {
    dispatch({ type: TRANSACTION_FORM_CLEAR_STATE });
  };

  return (
    <>
      <h1 className={styles.title}>Создать транзакцию</h1>
      <form
        className={styles.form}
        onSubmit={onFormSubmit}
        name="transaction-form"
      >
        <label className={styles.label} htmlFor="category">
          Категория:
        </label>
        <Select
          inputId="category"
          placeholder="Выберите"
          value={category ? { value: category, label: category } : null}
          onChange={onCategoryChange}
          options={categoriesForSelection}
          isClearable
          isSearchable
        />
        <label className={styles.label} htmlFor="subcategory">
          Подкатегория:
        </label>
        <Select
          inputId="subcategory"
          placeholder="Выберите"
          value={category ? { value: subcategory, label: subcategory } : null}
          onChange={onSubcategoryChange}
          options={subcategoriesForSelection}
          isClearable
          isSearchable
        />
        <label className={styles.label} htmlFor="eventDate">
          Дата:
        </label>
        <input
          data-testid="date"
          className={styles.input}
          type="date"
          onChange={onFormChange}
          value={eventDate}
          name="eventDate"
          id="eventDate"
          required
        />
        <label className={styles.label} htmlFor="amount">
          Сумма:
        </label>
        <input
          className={styles.input}
          type="number"
          onChange={onFormChange}
          value={amount}
          name="amount"
          id="amount"
          required
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

export default ExpensesForm;
