import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import H1 from "../../components/h1/H1";
import InputBox from "../../components/inputBox/InputBox";
import Button from "../../components/button/Button";
import BackButton from "../../components/backButton/BackButton";
import styles from "./attendanceDevices.module.css";
import getAllLocations from "../../actions/getAllLocations";
import { AttendanceDeviceType, LocationWithIdType } from "../../types";
import SelectBox from "../../components/selectBox/selectBox";
import Spinner from "../../components/spinner/Spinner";
import addNewAttendanceDevice from "../../actions/addNewAttendanceDevice";

const defaultDeviceData: AttendanceDeviceType = {
  deviceName: "",
  ipAddress: "",
  port: "",
  serialNumber: "",
  locationRef: "",
};

const defaultErrors = {
  deviceName: "",
  ipAddress: "",
  port: "",
  serialNumber: "",
  locationRef: "",
};

function AttendanceDevices() {
  const [locations, setLocations] = useState<LocationWithIdType[]>([]);
  const [isFetchingLocations, setIsFetchingLocations] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocations = async () => {
    const locations = await getAllLocations();
    if (locations) {
      setLocations(locations);
      if (locations.length > 0) {
        defaultDeviceData.locationRef = locations[0].id;
      }
    } else {
      alert("Error fetching locations");
    }
    setIsFetchingLocations(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const [deviceData, setDeviceData] = useState(defaultDeviceData);
  const [errors, setErrors] = useState(defaultErrors);
  const [isFirstSubmit, setIsFirstSubmit] = useState(false);

  const deviceDataInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setDeviceData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInput = (deviceData: AttendanceDeviceType) => {
    const newErrors = { ...defaultErrors };
    let isValid = true;

    if (deviceData.deviceName === "") {
      newErrors.deviceName = "Device Name is required";
      isValid = false;
    }
    if (deviceData.ipAddress === "") {
      newErrors.ipAddress = "IP Address is required";
      isValid = false;
    }
    if (deviceData.port === "") {
      newErrors.port = "Port is required";
      isValid = false;
    }
    if (deviceData.serialNumber === "") {
      newErrors.serialNumber = "Serial Number is required";
      isValid = false;
    }
    if (deviceData.locationRef === "") {
      newErrors.locationRef = "Location is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(
    function validateOnInputChange() {
      if (isFirstSubmit) {
        validateInput(deviceData);
      }
    },
    [deviceData]
  );

  const saveHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFirstSubmit) {
      setIsFirstSubmit(true);
    }
    setIsLoading(true);
    if (!validateInput(deviceData)) {
      setIsLoading(false);
      return;
    }
    const response = await addNewAttendanceDevice(deviceData);
    if (response) {
      alert("Device added successfully");
    } else {
      alert("Failed to add device");
    }
    setDeviceData(defaultDeviceData);
    setIsLoading(false);
    setIsFirstSubmit(false);
  };

  return (
    <Card>
      <div className={styles.header}>
        <BackButton to="/" />
        <H1>Attendance Devices</H1>
      </div>
      {isFetchingLocations ? (
        <Spinner text="Fetching locations..." />
      ) : !isFetchingLocations && locations.length === 0 ? (
        <p className={styles.noLocationsMessage}>
          No locations found. Please add a location first to add a device.
        </p>
      ) : (
        !isFetchingLocations &&
        locations && (
          <form className={styles.form}>
            <InputBox
              name="deviceName"
              label="Device Name"
              type="text"
              value={deviceData.deviceName}
              inputHandler={deviceDataInputHandler}
              error={errors.deviceName} // Pass error message to InputBox
            />
            <InputBox
              name="ipAddress"
              label="IP Address"
              type="text"
              value={deviceData.ipAddress}
              inputHandler={deviceDataInputHandler}
              error={errors.ipAddress} // Pass error message to InputBox
            />
            <InputBox
              name="port"
              label="Port"
              type="text"
              value={deviceData.port}
              inputHandler={deviceDataInputHandler}
              error={errors.port} // Pass error message to InputBox
            />
            <InputBox
              name="serialNumber"
              label="Serial Number"
              type="text"
              value={deviceData.serialNumber}
              inputHandler={deviceDataInputHandler}
              error={errors.serialNumber} // Pass error message to InputBox
            />
            <SelectBox
              name="locationRef"
              label="Location"
              options={locations.map((location) => ({
                label: location.locationName,
                value: location.id,
              }))}
              value={deviceData.locationRef}
              inputHandler={deviceDataInputHandler}
              error={errors.locationRef} // Pass error message to SelectBox
            />
            <Button
              disabled={isLoading}
              onClick={saveHandler}
              className={styles.button}>
              Save
            </Button>
            {isLoading && <Spinner text="Adding device..." />}
          </form>
        )
      )}
    </Card>
  );
}

export default AttendanceDevices;
