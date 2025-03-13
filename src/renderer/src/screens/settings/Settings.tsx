import { useState, useEffect } from "react";
import Card from "../../components/general/card/Card";
import H1 from "../../components/general/h1/H1";
import InputBox from "../../components/general/inputBox/InputBox";
import Button from "../../components/general/button/Button";
import BackButton from "../../components/general/backButton/BackButton";
import Loader from "../../components/general/loader/Loader";
import styles from "./settings.module.css";
import { SettingsType } from "../../types";
import { GET_SETTINGS, UPDATE_SETTINGS } from "@renderer/graphql/settings";
import { useMutation, useQuery } from "@apollo/client";
import { useAlert } from "@renderer/contexts/AlertContext";

const defaultSettingsData: SettingsType = {
  ip: "",
  port: "",
  apiKey: "",
};

function Settings() {
  const { showAlert } = useAlert();
  const { data, loading: isFetchingSettings } = useQuery(GET_SETTINGS);

  const [settingsData, setSettingsData] = useState(defaultSettingsData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFirstSubmit, setIsFirstSubmit] = useState(false);
  const [errors, setErrors] = useState({
    ip: "",
    port: "",
    apiKey: "",
  });

  useEffect(() => {
    if (data) {
      setSettingsData(data.getSettings);
    }
  }, [data]);

  const [updateSettingsMutation] = useMutation(UPDATE_SETTINGS);

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
    const newErrors = { ip: "", port: "", apiKey: "" };
    let isValid = true;

    if (settingsData.ip === "") {
      newErrors.ip = "IP or Domain is required";
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
    const response = await updateSettingsMutation({
      variables: {
        ip: settingsData.ip,
        port: settingsData.port,
        apiKey: settingsData.apiKey,
      },
    });
    const data = response.data.updateSettings;
    showAlert({ message: data.message, type: data.success ? "success" : "error" });
    setIsSubmitting(false);
    setIsFirstSubmit(false);
  };

  if (isFetchingSettings) {
    return <Loader text="Loading settings..." />;
  }

  return (
    <Card cardClassName={styles.card}>
      <div className={styles.header}>
        <BackButton to="/" />
        <H1>Settings</H1>
      </div>
      <form className={styles.form}>
        <InputBox
          name="ip"
          label="IP or Domain"
          type="text"
          value={settingsData.ip}
          inputHandler={settingsDataInputHandler}
          error={errors.ip}
        />
        <InputBox
          name="port"
          label="Port"
          type="text"
          value={settingsData.port}
          inputHandler={settingsDataInputHandler}
          error={errors.port}
        />
        <InputBox
          name="apiKey"
          label="API Key"
          type="text"
          value={settingsData.apiKey}
          inputHandler={settingsDataInputHandler}
          error={errors.apiKey}
        />
        <Button disabled={isSubmitting} onClick={saveHandler} className={styles.button}>
          Save
        </Button>
      </form>
      {isSubmitting && <Loader text="Saving settings..." />}
    </Card>
  );
}

export default Settings;
