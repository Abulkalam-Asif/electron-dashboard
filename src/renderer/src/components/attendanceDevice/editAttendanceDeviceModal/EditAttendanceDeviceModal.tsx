import { useMutation, useQuery } from "@apollo/client";
import Modal from "@renderer/components/general/modal/Modal";
import { EDIT_ATTENDANCE_DEVICE } from "@renderer/graphql/attendanceDevice";
import { GET_ALL_LOCATIONS } from "@renderer/graphql/location";
import {
  AttendanceDeviceType,
  AttendanceDeviceWithLocationType,
  LocationWithIdType,
} from "@renderer/types";
import { useEffect, useState } from "react";
import styles from "./editAttendanceDeviceModal.module.css";
import H1 from "@renderer/components/general/h1/H1";
import Loader from "@renderer/components/general/loader/Loader";
import CloseButton from "@renderer/components/general/closeButton/CloseButton";
import InputBox from "@renderer/components/general/inputBox/InputBox";
import SelectBox from "@renderer/components/general/selectBox/selectBox";
import Button from "@renderer/components/general/button/Button";
import { useAlert } from "@renderer/contexts/AlertContext";

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

type EditAttendanceDeviceModalProps = {
  setEditModalToDefault: () => void;
  editAttendanceDeviceData: AttendanceDeviceWithLocationType;
  setAllAttendanceDevices: React.Dispatch<
    React.SetStateAction<AttendanceDeviceWithLocationType[] | null>
  >;
};

function EditAttendanceDeviceModal({
  setEditModalToDefault,
  editAttendanceDeviceData,
  setAllAttendanceDevices,
}: EditAttendanceDeviceModalProps) {
  const { showAlert } = useAlert();

  // Fetching locations
  const {
    data,
    loading: isFetchingLocations,
    error,
  } = useQuery(GET_ALL_LOCATIONS, {
    fetchPolicy: "network-only",
  });

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
      showAlert({ message: "Error fetching locations", type: "error" });
    }
  }, [error]);

  const [editAttendanceDeviceMutation] = useMutation(EDIT_ATTENDANCE_DEVICE);
  const [isLoading, setIsLoading] = useState(false);

  const [deviceData, setDeviceData] = useState<AttendanceDeviceType>({
    name: editAttendanceDeviceData.name,
    ip: editAttendanceDeviceData.ip,
    port: editAttendanceDeviceData.port,
    serialNumber: editAttendanceDeviceData.serialNumber,
    locationRef: editAttendanceDeviceData.locationRef.id,
  });
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
        validateInput({
          name: deviceData.name,
          ip: deviceData.ip,
          port: deviceData.port,
          serialNumber: deviceData.serialNumber,
          locationRef: deviceData.locationRef,
        });
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
    if (
      !validateInput({
        name: deviceData.name,
        ip: deviceData.ip,
        port: deviceData.port,
        serialNumber: deviceData.serialNumber,
        locationRef: deviceData.locationRef,
      })
    ) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await editAttendanceDeviceMutation({
        variables: {
          id: editAttendanceDeviceData.id,
          name: deviceData.name,
          ip: deviceData.ip,
          port: deviceData.port,
          serialNumber: deviceData.serialNumber,
          locationId: deviceData.locationRef,
        },
      });
      const data = response.data.editAttendanceDevice;
      if (data.success) {
        setAllAttendanceDevices((prev: AttendanceDeviceWithLocationType[] | null) => {
          if (!prev) return null;
          return prev?.map((device) => {
            if (device.id === editAttendanceDeviceData.id) {
              return {
                id: editAttendanceDeviceData.id,
                name: deviceData.name,
                ip: deviceData.ip,
                port: deviceData.port,
                serialNumber: deviceData.serialNumber,
                locationRef: {
                  id: deviceData.locationRef,
                  name:
                    locations.find((location) => location.id === deviceData.locationRef)?.name ||
                    "",
                  description:
                    locations.find((location) => location.id === deviceData.locationRef)
                      ?.description || "",
                  pin: String(
                    locations.find((location) => location.id === deviceData.locationRef)?.pin || 0
                  ),
                },
              };
            }
            return device;
          });
        });
      }
      showAlert({ message: data.message, type: data.success ? "success" : "error" });
    } catch (error) {
      showAlert({ message: "An error occured. Please refresh and try again.", type: "error" });
    }
    setDeviceData(defaultDeviceData);
    setIsLoading(false);
    setIsFirstSubmit(false);
    setEditModalToDefault();
  };

  return (
    <>
      <Modal cardClassName={styles.modalCard}>
        <div className={styles.header}>
          <H1>Attendance Devices</H1>
          <CloseButton onClick={setEditModalToDefault} />
        </div>
        {isFetchingLocations ? (
          <Loader text="Fetching locations..." />
        ) : !isFetchingLocations && locations.length === 0 ? (
          <p className={styles.noLocationsMessage}>
            No locations found. Please add a location first.
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
                error={errors.name}
              />
              <InputBox
                name="ip"
                label="IP Address"
                type="text"
                value={deviceData.ip}
                inputHandler={deviceDataInputHandler}
                error={errors.ip}
              />
              <InputBox
                name="port"
                label="Port"
                type="text"
                value={deviceData.port}
                inputHandler={deviceDataInputHandler}
                error={errors.port}
              />
              <InputBox
                name="serialNumber"
                label="Serial Number"
                type="text"
                value={deviceData.serialNumber}
                inputHandler={deviceDataInputHandler}
                error={errors.serialNumber}
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
                error={errors.locationRef}
              />
              <Button disabled={isLoading} onClick={saveHandler} className={styles.button}>
                Save
              </Button>
              {isLoading && <Loader text="Updating device..." />}
            </form>
          )
        )}
      </Modal>
    </>
  );
}

export default EditAttendanceDeviceModal;
