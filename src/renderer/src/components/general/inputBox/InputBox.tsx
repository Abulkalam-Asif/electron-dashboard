import type React from "react";
import styles from "./inputBox.module.css";

interface InputBoxProps {
  label: string;
  type: string;
  name: string;
  value: string;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string; // Add error prop to the interface
}

function InputBox({
  label,
  type,
  name,
  value,
  inputHandler,
  className = "",
  error = "", // Include error in props
}: InputBoxProps) {
  return (
    <div className={`${styles.inputBox} ${className}`}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={inputHandler}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default InputBox;
