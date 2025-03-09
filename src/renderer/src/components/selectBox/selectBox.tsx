import type React from "react";
import styles from "./selectBox.module.css";

interface SelectBoxProps {
  label: string;
  name: string;
  value: string;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: { label: string; value: string }[];
  className?: string;
  error?: string;
}

function SelectBox({
  label,
  name,
  value,
  inputHandler,
  options,
  className = "",
  error = "",
}: SelectBoxProps) {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    inputHandler({
      target: { value, name },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={`${styles.selectBox} ${className}`}>
      <label>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChangeHandler}
        className={`${styles.input} ${error ? styles.inputError : ""}`}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default SelectBox;
