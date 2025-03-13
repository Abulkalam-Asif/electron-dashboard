import { useQuery } from "@apollo/client";
import { AttendanceDeviceWithIdType, AttendanceDeviceWithLocationType } from "@renderer/types";
import { useEffect, useState } from "react";
import styles from "./attendanceDevices.module.css";
import Card from "@renderer/components/general/card/Card";
import H1 from "@renderer/components/general/h1/H1";
import Loader from "@renderer/components/general/loader/Loader";
import Button from "@renderer/components/general/button/Button";
import BackButton from "@renderer/components/general/backButton/BackButton";
import { GET_ATTENDANCE_DEVICES } from "@renderer/graphql/attendanceDevice";
import AddNewAttendanceDeviceModal from "@renderer/components/attendanceDevice/addNewAttendanceDeviceModal/AddNewAttendanceDeviceModal";

const Location = () => {
  const { data, loading, error } = useQuery(GET_ATTENDANCE_DEVICES);
  const [allAttendanceDevices, setAllAttendanceDevices] = useState<
    AttendanceDeviceWithLocationType[] | null
  >(null);

  const [isAddAttendanceDeviceModalVisible, setIsAddAttendanceDeviceModalVisible] = useState(false);
  const hideAddAttendanceDeviceModal = () => setIsAddAttendanceDeviceModalVisible(false);

  const [isEditAttendanceDeviceModalVisible, setIsEditAttendanceDeviceModalVisible] =
    useState(false);
  const [editAttendanceDeviceData, setEditAttendanceDeviceData] =
    useState<AttendanceDeviceWithIdType | null>(null);
  const setEditModalToDefault = () => {
    setIsEditAttendanceDeviceModalVisible(false);
    setEditAttendanceDeviceData(null);
  };

  const [isDeleteAttendanceDeviceModalVisible, setIsDeleteAttendanceDeviceModalVisible] =
    useState(false);
  const [deleteAttendanceDeviceId, setDeleteAttendanceDeviceId] = useState("");
  const setDeleteModalToDefault = () => {
    setIsDeleteAttendanceDeviceModalVisible(false);
    setDeleteAttendanceDeviceId("");
  };

  useEffect(() => {
    if (data) {
      setAllAttendanceDevices(data.getAttendanceDevices);
    }
  }, [data]);

  if (loading) return <Loader text="Fetching attendance devices..." />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Card cardClassName={styles.card}>
        <div className={styles.header}>
          <BackButton to="/" />
          <H1>Attendance Devices</H1>
          <Button onClick={() => setIsAddAttendanceDeviceModalVisible(true)} size="sm">
            + Add Attendance Device
          </Button>
        </div>
        <div>
          {allAttendanceDevices && (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th align="left">No.</th>
                    <th align="left">Name</th>
                    <th align="left">IP</th>
                    <th align="left">Port</th>
                    <th align="left">Serial Number</th>
                    <th align="left">Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allAttendanceDevices.map((device, index) => (
                    <tr key={device.id}>
                      <td>{index + 1}</td>
                      <td>{device.name}</td>
                      <td>{device.ip}</td>
                      <td>{device.port}</td>
                      <td>{device.serialNumber}</td>
                      <td>{device.locationRef.name}</td>
                      <td>
                        <div className={styles.actions}>
                          <Button
                            size="sm"
                            onClick={() => {
                              // setEditAttendanceDeviceData(device);
                              setIsEditAttendanceDeviceModalVisible(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setDeleteAttendanceDeviceId(device.id);
                              setIsDeleteAttendanceDeviceModalVisible(true);
                            }}
                            className={styles.delete}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </Card>
      {isAddAttendanceDeviceModalVisible && (
        <AddNewAttendanceDeviceModal hideAddAttendanceDeviceModal={hideAddAttendanceDeviceModal} />
      )}

      {/* {isAddLocationModalVisible && (
        <AddNewLocationModal hideAddLocationModal={hideAddLocationModal} />
      )}
      {isEditLocationModalVisible && editLocationData && (
        <EditLocationModal
          setEditModalToDefault={setEditModalToDefault}
          editLocationData={editLocationData}
        />
      )}
      {isDeleteLocationModalVisible && (
        <DeleteLocationModal
          deleteLocationId={deleteLocationId}
          setDeleteModalToDefault={setDeleteModalToDefault}
        />
      )} */}
    </>
  );
};

export default Location;
