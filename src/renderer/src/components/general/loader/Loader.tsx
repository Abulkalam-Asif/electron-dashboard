import styles from "./loader.module.css";

type LoaderProps = {
  text?: string;
};

const Loader = ({ text }: LoaderProps) => {
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

export default Loader;
