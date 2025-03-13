import styles from "./h1.module.css";

type H1Props = {
  children: React.ReactNode;
};

const H1 = ({ children }: H1Props) => {
  return (
    <>
      <h1 className={styles.h1}>{children}</h1>
    </>
  );
};

export default H1;
