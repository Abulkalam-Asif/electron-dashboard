import { useEffect } from "react";
import styles from "./card.module.css";
type CardProps = {
  children: React.ReactNode;
  containerClassName?: string;
};

const Card = ({ children, containerClassName = "" }: CardProps) => {
  useEffect(() => {
    const container = document.querySelector(`.${styles.container}`);
    if (container) {
      container.classList.add(styles.enter);
    }
  }, []);

  return (
    <>
      <section className={styles.section}>
        <div className={`${styles.container} ${containerClassName}`}>
          {children}
        </div>
      </section>
    </>
  );
};

export default Card;
