import { useState, useEffect } from "react";
import Card from "../../components/general/card/Card";
import H1 from "../../components/general/h1/H1";
import InputBox from "../../components/general/inputBox/InputBox";
import Button from "../../components/general/button/Button";
import BackButton from "../../components/general/closeButton/CloseButton";
import Loader from "../../components/general/loader/Loader";
import styles from "./settings.module.css";
import getSettings from "../../actions/getSettings";
import { SettingsType } from "../../types";
import updateSettings from "../../actions/updateSettings";

const defaultSettingsData: SettingsType = {
  ipOrDomain: "",
  port: "",
  apiKey: "",
};

function Settings() {
  const [settingsData, setSettingsData] = useState(defaultSettingsData);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFirstSubmit, setIsFirstSubmit] = useState(false);
  const [errors, setErrors] = useState({
    ipOrDomain: "",
    port: "",
    apiKey: "",
  });

  const fetchSettings = async () => {
    const data = await getSettings();
    if (data) {
      setSettingsData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const settingsDataInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSettingsData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(
    function validateOnInputChange() {
      if (isFirstSubmit) {
        validateInput(settingsData);
      }
    },
    [settingsData]
  );

  const validateInput = (settingsData: SettingsType) => {
    const newErrors = { ipOrDomain: "", port: "", apiKey: "" };
    let isValid = true;

    if (settingsData.ipOrDomain === "") {
      newErrors.ipOrDomain = "IP or Domain is required";
      isValid = false;
    }
    if (settingsData.port === "") {
      newErrors.port = "Port is required";
      isValid = false;
    }
    if (settingsData.apiKey === "") {
      newErrors.apiKey = "API Key is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const saveHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFirstSubmit) {
      setIsFirstSubmit(true);
    }
    setIsSubmitting(true);
    if (!validateInput(settingsData)) {
      setIsSubmitting(false);
      return;
    }
    const response = await updateSettings(settingsData);
    if (response) {
      alert("Settings updated successfully");
    } else {
      alert("Failed to update settings");
    }
    setIsSubmitting(false);
    setIsFirstSubmit(false);
  };

  if (loading) {
    return <Loader text="Loading settings..." />;
  }

  return (
    <Card>
      <div className={styles.header}>
        <BackButton to="/" />
        <H1>Settings</H1>
      </div>
      <form className={styles.form}>
        <InputBox
          name="ipOrDomain"
          label="IP or Domain"
          type="text"
          value={settingsData.ipOrDomain}
          inputHandler={settingsDataInputHandler}
          error={errors.ipOrDomain} // Pass error message to InputBox
        />
        <InputBox
          name="port"
          label="Port"
          type="text"
          value={settingsData.port}
          inputHandler={settingsDataInputHandler}
          error={errors.port} // Pass error message to InputBox
        />
        <InputBox
          name="apiKey"
          label="API Key"
          type="text"
          value={settingsData.apiKey}
          inputHandler={settingsDataInputHandler}
          error={errors.apiKey} // Pass error message to InputBox
        />
        <Button
          disabled={isSubmitting}
          onClick={saveHandler}
          className={styles.button}>
          Save
        </Button>
      </form>
      {isSubmitting && <Loader text="Saving settings..." />}
    </Card>
  );
}

export default Settings;
