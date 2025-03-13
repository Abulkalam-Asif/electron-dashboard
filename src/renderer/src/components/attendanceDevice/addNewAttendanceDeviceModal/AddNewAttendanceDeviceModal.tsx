import { useMutation, useQuery } from "@apollo/client";
import Modal from "@renderer/components/general/modal/Modal";
import { ADD_ATTENDANCE_DEVICE } from "@renderer/graphql/attendanceDevice";
import { GET_ALL_LOCATIONS } from "@renderer/graphql/location";
import { AttendanceDeviceType, LocationWithIdType } from "@renderer/types";
import { useEffect, useState } from "react";
import styles from "./addNewAttendanceDeviceModal.module.css";
import BackButton from "@renderer/components/general/backButton/BackButton";
import H1 from "@renderer/components/general/h1/H1";
import Loader from "@renderer/components/general/loader/Loader";
import CloseButton from "@renderer/components/general/closeButton/CloseButton";
import InputBox from "@renderer/components/general/inputBox/InputBox";
import SelectBox from "@renderer/components/general/selectBox/selectBox";
import Button from "@renderer/components/general/button/Button";

const defaultDeviceData: AttendanceDeviceType = {
  name: "",
  ip: "",
  port: "",
  serialNumber: "",
  locationRef: "",
};

const defaultErrors = {
  name: "",
  ip: "",
  port: "",
  serialNumber: "",
  locationRef: "",
};

type AddNewAttendanceDeviceModalProps = { hideAddAttendanceDeviceModal: () => void };

function AddNewAttendanceDeviceModal({
  hideAddAttendanceDeviceModal,
}: AddNewAttendanceDeviceModalProps) {
  // Fetching locations
  const { data, loading: isFetchingLocations, error } = useQuery(GET_ALL_LOCATIONS);

  const [locations, setLocations] = useState<LocationWithIdType[]>([]);
  useEffect(() => {
    if (data) {
      setLocations(data.getAllLocations);
      if (locations.length > 0) {
        defaultDeviceData.locationRef = locations[0].id;
      }
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      alert("Error fetching locations");
    }
  }, [error]);

  const [addNewAttendanceDeviceMutation] = useMutation(ADD_ATTENDANCE_DEVICE);
  const [isLoading, setIsLoading] = useState(false);

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

    if (deviceData.name === "") {
      newErrors.name = "Device Name is required";
      isValid = false;
    }
    if (deviceData.ip === "") {
      newErrors.ip = "IP Address is required";
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
    const { data } = await addNewAttendanceDeviceMutation({
      variables: {
        name: deviceData.name,
        ip: deviceData.ip,
        port: deviceData.port,
        serialNumber: deviceData.serialNumber,
        locationId: deviceData.locationRef,
      },
    });
    if (data.addNewAttendanceDevice) {
      alert("Device added successfully");
    } else {
      alert("Failed to add device");
    }
    setDeviceData(defaultDeviceData);
    setIsLoading(false);
    setIsFirstSubmit(false);
  };

  return (
    <>
      <Modal cardClassName={styles.modalCard}>
        <div className={styles.header}>
          <H1>Attendance Devices</H1>
          <CloseButton onClick={hideAddAttendanceDeviceModal} />
        </div>
        {isFetchingLocations ? (
          <Loader text="Fetching locations..." />
        ) : !isFetchingLocations && locations.length === 0 ? (
          <p className={styles.noLocationsMessage}>
            No locations found. Please add a location first to add a device.
          </p>
        ) : (
          !isFetchingLocations &&
          locations && (
            <form className={styles.form}>
              <InputBox
                name="name"
                label="Device Name"
                type="text"
                value={deviceData.name}
                inputHandler={deviceDataInputHandler}
                error={errors.name} // Pass error message to InputBox
              />
              <InputBox
                name="ip"
                label="IP Address"
                type="text"
                value={deviceData.ip}
                inputHandler={deviceDataInputHandler}
                error={errors.ip} // Pass error message to InputBox
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
                  label: location.name,
                  value: location.id,
                }))}
                value={deviceData.locationRef}
                inputHandler={deviceDataInputHandler}
                error={errors.locationRef} // Pass error message to SelectBox
              />
              <Button disabled={isLoading} onClick={saveHandler} className={styles.button}>
                Save
              </Button>
              {isLoading && <Loader text="Adding device..." />}
            </form>
          )
        )}
      </Modal>
    </>
  );
}

export default AddNewAttendanceDeviceModal;
