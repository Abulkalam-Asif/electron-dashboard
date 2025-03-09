import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import H1 from "../../components/h1/H1";
import InputBox from "../../components/inputBox/InputBox";
import Button from "../../components/button/Button";
import BackButton from "../../components/backButton/BackButton";
import styles from "./location.module.css";
import addNewLocation from "../../actions/addNewLocation";
import { LocationType } from "../../types";
import Spinner from "../../components/spinner/Spinner";

const defaultLocationData: LocationType = {
  locationName: "",
  description: "",
  locationPin: "",
};

function Location() {
  const [locationData, setLocationData] = useState(defaultLocationData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstSubmit, setIsFirstSubmit] = useState(false);
  const [errors, setErrors] = useState({
    locationName: "",
    description: "",
    locationPin: "",
  });

  const locationDataInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(
    function validateOnInputChange() {
      if (isFirstSubmit) {
        validateInput(locationData);
      }
    },
    [locationData]
  );

  const validateInput = (locationData: LocationType) => {
    const newErrors = { locationName: "", description: "", locationPin: "" };
    let isValid = true;

    if (locationData.locationName === "") {
      newErrors.locationName = "Location Name is required";
      isValid = false;
    }
    if (locationData.description === "") {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (locationData.locationPin === "") {
      newErrors.locationPin = "Location Pin is required";
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
    setIsLoading(true);
    if (!validateInput(locationData)) {
      setIsLoading(false);
      return;
    }
    const response = await addNewLocation(locationData);
    if (response) {
      alert("Location added successfully");
    } else {
      alert("Failed to add location");
    }
    setLocationData(defaultLocationData);
    setIsLoading(false);
    setIsFirstSubmit(false);
  };

  return (
    <>
      <Card>
        <div className={styles.header}>
          <BackButton to="/" />
          <H1>Location</H1>
        </div>
        <form className={styles.form}>
          <InputBox
            name="locationName"
            label="Location Name"
            type="text"
            value={locationData.locationName}
            inputHandler={locationDataInputHandler}
            error={errors.locationName} // Pass error message to InputBox
          />
          <InputBox
            name="description"
            label="Description"
            type="text"
            value={locationData.description}
            inputHandler={locationDataInputHandler}
            error={errors.description} // Pass error message to InputBox
          />
          <InputBox
            name="locationPin"
            label="Location Pin"
            type="text"
            value={locationData.locationPin}
            inputHandler={locationDataInputHandler}
            error={errors.locationPin} // Pass error message to InputBox
          />
          <Button
            disabled={isLoading}
            onClick={saveHandler}
            className={styles.button}>
            Save
          </Button>
        </form>
      </Card>
      {isLoading && <Spinner text="Adding location..." />}
    </>
  );
}

export default Location;
