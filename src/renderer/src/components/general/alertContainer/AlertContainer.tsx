import { useAlert } from "@renderer/contexts/AlertContext";
import Alert from "../alert/Alert";
import styles from "./alertContainer.module.css";

type AlertContainerProps = {};

const AlertContainer = ({}: AlertContainerProps) => {
  const { alerts } = useAlert();
  return (
    <>
      <div className={styles.container}>
        {alerts.map((alert, index) => (
          <Alert key={index} type={alert.type} message={alert.message} />
        ))}
      </div>
    </>
  );
};

export default AlertContainer;
