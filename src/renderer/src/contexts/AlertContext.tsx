import { createContext, useContext, useEffect, useState } from "react";
import { AlertType } from "@renderer/types";

const AlertContext = createContext<{
  alerts: AlertType[];
  showAlert: (alert: AlertType) => void;
  clearAlerts: () => void;
}>({
  alerts: [],
  showAlert: () => {},
  clearAlerts: () => {},
});

type AlertProviderProps = {
  children: React.ReactNode;
};

const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const showAlert = (alert: AlertType) => {
    setAlerts([alert]);
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearAlerts();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [alerts]);

  return (
    <AlertContext.Provider value={{ alerts, showAlert, clearAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};

export { AlertContext, AlertProvider, useAlert };
