import { FaCheck, FaExclamation } from "react-icons/fa";
import styles from "./alert.module.css";
import { FaX } from "react-icons/fa6";
import { useEffect } from "react";
type AlertProps = {
  type: string;
  message: string;
};

const Alert = ({ type, message }: AlertProps) => {
  useEffect(() => {
    const alert = document.querySelector(`.${styles.alert}`);
    if (alert) {
      alert.classList.add(styles.enter);
    }
  }, []);

  return (
    <>
      <div className={styles.alert}>
        {type === "success" ? (
          <FaCheck className={`${styles.icon} ${styles.success}`} />
        ) : type === "error" ? (
          <FaX className={`${styles.icon} ${styles.error}`} />
        ) : type === "warning" ? (
          <FaExclamation className={`${styles.icon} ${styles.warning}`} />
        ) : null}
        <div>{message}</div>
      </div>
    </>
  );
};

export default Alert;
