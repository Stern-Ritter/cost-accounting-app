import React, { KeyboardEvent } from "react";
import styles from "./multiple-input.module.css";

function MultipleInput({
  name,
  value,
  placeholder,
  onValueChange,
}: MultipleInputProps) {
  function removeTags(removeIdx: number) {
    onValueChange({
      field: name,
      value: [...value.filter((_, idx) => idx !== removeIdx)],
    });
  }

  function addTags(evt: KeyboardEvent<HTMLInputElement>) {
    const input = evt.target as HTMLInputElement;
    if (input.value.trim().length > 0) {
      onValueChange({
        field: name,
        value: [...value, input.value],
      });
      input.value = "";
    }
  }

  function onKeyDownHandler(evt: KeyboardEvent<HTMLInputElement>) {
    if (evt.key === "Enter") {
      evt.preventDefault();
      addTags(evt);
    }
  }

  return (
    <div className={styles.container} data-testid="value-input">
      <ul className={styles.list}>
        {value.map((el, index) => (
          <li key={index} className={styles.value} data-testid="value">
            <span className={styles.title}>{el}</span>
            <span className={styles.close} onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        className={styles.input}
        type="text"
        onKeyDown={onKeyDownHandler}
        placeholder={placeholder}
        name={name}
        id={name}
      />
    </div>
  );
}
export default MultipleInput;
