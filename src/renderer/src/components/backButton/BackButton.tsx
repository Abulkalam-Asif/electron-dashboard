import { useNavigate } from "react-router-dom";
import styles from "./backButton.module.css";
import { FaArrowLeft } from "react-icons/fa";

type BackButtonProps = {
  to: string;
  className?: string;
};

const BackButton = ({ to, className = "" }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`${styles.button} ${className}`}>
      <FaArrowLeft width={20} height={20} />
    </button>
  );
};

export default BackButton;
