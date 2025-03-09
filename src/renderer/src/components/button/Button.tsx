import styles from "./button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
};

const Button = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`${styles.button} ${className} ${
          disabled ? styles.disabled : ""
        }`}>
        {children}
      </button>
    </>
  );
};

export default Button;
