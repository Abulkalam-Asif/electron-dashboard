import styles from "./closeButton.module.css";
import { FaX } from "react-icons/fa6";

type CloseButtonProps = {
  onClick: () => void;
  className?: string;
};

const CloseButton = ({ onClick, className = "" }: CloseButtonProps) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
      <FaX width={20} height={20} />
    </button>
  );
};

export default CloseButton;
