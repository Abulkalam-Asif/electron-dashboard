import styles from "./spinner.module.css";

type SpinnerProps = {
  text?: string;
};

const Spinner = ({ text }: SpinnerProps) => {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinnerCircle}></div>
        <div className={styles.spinnerCircle}></div>
        <div className={styles.spinnerCircle}></div>
      </div>
      {text && <div className={styles.spinnerText}>{text}</div>}
    </div>
  );
};

export default Spinner;
